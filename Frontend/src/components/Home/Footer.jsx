/* eslint-disable no-irregular-whitespace */
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-600 bg-gray-100 lg:py-4">
      <div className="container px-4 py-8 mx-auto max-w-7xl lg:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/logo-05.png"
              alt="Company Logo"
              width={120}
              height={40}
            />
            <p className="mt-4 text-sm text-center md:text-left">
              Your trusted partner in creating beautiful and functional spaces.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-gray-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/enquiry"
                  className="transition-colors hover:text-gray-900"
                >
                  Enquiry
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Projects</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/projects/residential"
                  className="transition-colors hover:text-gray-900"
                >
                  Residential
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/commercial"
                  className="transition-colors hover:text-gray-900"
                >
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li>Avenue 64, BPTP Park -81, Sector-81,Greater Faridabad</li>
              <li>Phone: +91 9540274407 </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container flex flex-col items-center justify-end py-4 mx-auto px-28 sm:flex-row">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
          {/* <div className="flex mt-2 space-x-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-sm transition-colors hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm transition-colors hover:text-gray-900"
            >
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
