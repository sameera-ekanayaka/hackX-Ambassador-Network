'use client'

import { useState, useRef, useEffect } from 'react'

interface ComboboxProps {
  label: string
  options: { id: string; name: string }[]
  value: { id?: string; name: string }
  onChange: (value: { id?: string; name: string }) => void
  placeholder?: string
  suggestedValue?: string
}

export default function Combobox({ label, options, value, onChange, placeholder, suggestedValue }: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState(value.name)
  const [isTyping, setIsTyping] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value.name)
    setIsTyping(false)
  }, [value.name])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = (!isTyping || query === '') 
    ? options 
    : options.filter((option) => option.name.toLowerCase().includes(query.toLowerCase()))

  const handleSelect = (option: { id: string; name: string }) => {
    setQuery(option.name)
    setIsTyping(false)
    onChange({ id: option.id, name: option.name })
    setIsOpen(false)
  }

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    setIsTyping(true)
    
    // Check if it exactly matches an existing option
    const exactMatch = options.find(o => o.name.toLowerCase() === val.toLowerCase())
    if (exactMatch) {
      onChange({ id: exactMatch.id, name: exactMatch.name })
    } else {
      // It's a new custom value
      onChange({ id: undefined, name: val })
    }
  }

  // Check if current query exactly matches any option
  const exactMatchExists = options.some(o => o.name.toLowerCase() === query.toLowerCase())

  return (
    <div className="relative flex flex-col gap-1 w-full" ref={wrapperRef}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {suggestedValue && (
        <p className="text-xs text-blue-600 mb-1">
          Applicant specified: <span className="font-semibold">{suggestedValue}</span>
        </p>
      )}
      
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-text text-gray-900 bg-white"
          placeholder={placeholder || 'Select or type to add new...'}
          value={query}
          onChange={handleCustomInput}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 flex items-center pr-2 focus:outline-none text-gray-400 hover:text-gray-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {isOpen && (
        <ul className="absolute z-50 top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          
          {/* Always allow creating exactly what was typed if it doesn't exist */}
          {query !== '' && !exactMatchExists && (
             <li
               className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-b border-gray-100"
               onClick={() => {
                 onChange({ id: undefined, name: query })
                 setIsOpen(false)
               }}
             >
               Create new: <span className="font-semibold">"{query}"</span>
             </li>
          )}

          {filteredOptions.length === 0 && query !== '' && exactMatchExists === false ? null : (
            filteredOptions.map((option) => (
              <li
                key={option.id}
                className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </li>
            ))
          )}
          
          {filteredOptions.length === 0 && exactMatchExists && (
            <li className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
              No other matches found.
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
