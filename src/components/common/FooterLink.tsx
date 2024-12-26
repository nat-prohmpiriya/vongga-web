import React from 'react'

const FooterLink = () => {
    return (

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <a href="/about" className="hover:underline">
                About
            </a>
            <a href="/help" className="hover:underline">
                Help Center
            </a>
            <a href="/terms" className="hover:underline">
                Terms of Service
            </a>
            <a href="/privacy" className="hover:underline">
                Privacy Policy
            </a>
            <a href="/cookie" className="hover:underline">
                Cookie Policy
            </a>
            <a href="/accessibility" className="hover:underline">
                Accessibility
            </a>
            <a href="/careers" className="hover:underline">
                Careers
            </a>
            <a href="/marketing" className="hover:underline">
                Marketing
            </a>
            <a href="/developers" className="hover:underline">
                Developers
            </a>
            <a href="/settings" className="hover:underline">
                Settings
            </a>
            <span> 2023 yourwebsite</span>
        </div>
    )
}

export default FooterLink