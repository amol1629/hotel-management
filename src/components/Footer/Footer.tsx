import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	// Background Image and Room Data inside the component
	const backgroundImageUrl = "/images/cover-image-2.png";
	return (
		<footer className="relative overflow-hidden text-white py-12 mt-8">
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					filter: "blur(6px)",
					transform: "scale(1.1)",
				}}
			></div>

			{/* Dark Overlay */}
			<div className="absolute inset-0 bg-black bg-opacity-50 z-10 l"></div>
			<div className="container mx-auto px-6 relative z-20">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* About Section */}
					<div className="space-y-4 transform transition-transform hover:scale-105">
						<h3 className="text-xl font-bold">Hotel Management</h3>
						<p className="text-gray-300">
							Your trusted partner in luxury and comfort. We
							provide the best services for your stay.
						</p>
					</div>

					{/* Quick Links */}
					<div className="space-y-4 transform transition-transform hover:scale-105">
						<h3 className="text-xl font-bold">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-gray-300 hover:text-orange-400 transition-colors"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/services"
									className="text-gray-300 hover:text-orange-400 transition-colors"
								>
									Services
								</Link>
							</li>
							<li>
								<Link
									href="/rooms"
									className="text-gray-300 hover:text-orange-400 transition-colors"
								>
									Rooms
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-gray-300 hover:text-orange-400 transition-colors"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div className="space-y-4 transform transition-transform hover:scale-105">
						<h3 className="text-xl font-bold">Contact Us</h3>
						<p className="text-gray-300">
							123 Luxury Street, City, Country
						</p>
						<p className="text-gray-300">
							Email: info@hotelmanagement.com
						</p>
						<p className="text-gray-300">Phone: +123 456 7890</p>
					</div>

					{/* Social Media */}
					<div className="space-y-4 transform transition-transform hover:scale-105">
						<h3 className="text-xl font-bold">Follow Us</h3>
						<div className="flex space-x-4">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-orange-400 transition-colors"
							>
								<FaFacebook size={24} />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-orange-400 transition-colors"
							>
								<FaTwitter size={24} />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-orange-400 transition-colors"
							>
								<FaInstagram size={24} />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-orange-400 transition-colors"
							>
								<FaLinkedin size={24} />
							</a>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-700 mt-8 pt-8 text-center">
					<p className="text-gray-300">
						&copy; {new Date().getFullYear()} Hotel Management. All
						rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
