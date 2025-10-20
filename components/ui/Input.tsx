import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export default function Input({ label, ...rest }: Props) {
    return (
        <label className="block">

            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}

            <input
            {...rest}
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm outline-none py-[8px] px-[16px]"
            />

        </label>
    );
    }