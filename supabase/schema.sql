CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE university (
    university_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_name TEXT NOT NULL UNIQUE
);

CREATE TABLE faculty (
    faculty_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID NOT NULL REFERENCES university(university_id) ON DELETE CASCADE,
    faculty_name TEXT NOT NULL,
    CONSTRAINT unique_faculty_per_university UNIQUE (university_id, faculty_name)
);

CREATE TABLE degree_programme (
    degree_programme_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faculty_id UUID NOT NULL REFERENCES faculty(faculty_id) ON DELETE CASCADE,
    programme_name TEXT NOT NULL,
    CONSTRAINT unique_programme_per_faculty UNIQUE (faculty_id, programme_name)
);

CREATE TABLE users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin','ambassador')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ambassador (
    ambassador_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    ambassador_code TEXT UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone_number TEXT,
    whatsapp_number TEXT,
    year_of_study INT,
    submitted_university TEXT,
    submitted_faculty TEXT,
    submitted_degree_programme TEXT,
    motivation TEXT,
    university_id UUID REFERENCES university(university_id) ON DELETE SET NULL,
    faculty_id UUID REFERENCES faculty(faculty_id) ON DELETE SET NULL,
    degree_programme_id UUID REFERENCES degree_programme(degree_programme_id) ON DELETE SET NULL,
    facebook_url TEXT,
    linkedin_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending','approved','rejected','suspended')),
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE admin (
    admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE club (
    club_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    club_name TEXT NOT NULL UNIQUE
);

CREATE TABLE ambassador_club (
    ambassador_id UUID NOT NULL REFERENCES ambassador(ambassador_id) ON DELETE CASCADE,
    club_id UUID NOT NULL REFERENCES club(club_id) ON DELETE CASCADE,
    PRIMARY KEY (ambassador_id, club_id)
);

CREATE TABLE club_temp (
    temp_club_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ambassador_id UUID NOT NULL REFERENCES ambassador(ambassador_id) ON DELETE CASCADE,
    submitted_club_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending','approved','rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE activity_submission (
    submission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ambassador_id UUID NOT NULL REFERENCES ambassador(ambassador_id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL
        CHECK (activity_type IN ('awareness_session','club_endorsement','pr_content')),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending','approved','rejected')),
    rejection_reason TEXT,
    points_awarded INT NOT NULL DEFAULT 0,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES admin(admin_id) ON DELETE SET NULL
);

CREATE TABLE file_upload (
    file_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES activity_submission(submission_id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE point_transaction (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ambassador_id UUID NOT NULL REFERENCES ambassador(ambassador_id) ON DELETE CASCADE,
    submission_id UUID REFERENCES activity_submission(submission_id) ON DELETE SET NULL,
    activity_type TEXT NOT NULL,
    points INT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE VIEW ambassador_points AS
SELECT ambassador_id, COALESCE(SUM(points),0) AS total_points
FROM point_transaction
GROUP BY ambassador_id;

CREATE TABLE referred_team (
    team_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ambassador_id UUID NOT NULL REFERENCES ambassador(ambassador_id) ON DELETE CASCADE,
    team_name TEXT NOT NULL,
    current_stage TEXT NOT NULL
        CHECK (current_stage IN ('registered','proposal_submitted','semifinalist','finalist')),
    registration_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE team_stage_history (
    history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES referred_team(team_id) ON DELETE CASCADE,
    stage TEXT NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ambassador_timestamp
BEFORE UPDATE ON ambassador
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_referred_team_timestamp
BEFORE UPDATE ON referred_team
FOR EACH ROW EXECUTE FUNCTION update_timestamp();