import React from 'react'

export default function FormFieldIcon({ fields, onChange, errors }) {
    return (
        <>
            {fields.map((field) => {
                const Icon = field.icon
                const hasError = !!errors?.[field.name]
                const errorMessage = typeof errors?.[field.name] === 'string' ? errors[field.name] : null

                return (
                    <div key={field.name}>
                        <div className='flex justify-between'>
                            <label className="block mb-2.5 text-sm font-medium text-heading">{field.label}</label>
                            {errorMessage && <p className="text-red-500 text-xs mt-1 text-right">{errorMessage}</p>}
                        </div>
                        <div className={`flex shadow-xs ${hasError ? 'border border-red-500 rounded-lg' : 'border-default-medium'}`}>
                            {Icon && (
                                <span className="inline-flex items-center px-3 text-sm text-body bg-white border rounded-e-0 border-default-medium border-e-0 rounded-s-lg">
                                    <Icon className="w-5 h-5 text-gray-400" />
                                </span>
                            )}
                            <input
                                type={field.type || 'text'}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={onChange}
                                className={`rounded-none rounded-e-lg block w-full px-3 py-2.5 border text-heading text-sm focus:ring-brand focus:border-brand placeholder:text-body `}
                            />
                        </div>

                    </div>
                )
            })}
        </>
    )
}