// data/developers.ts
export interface Developer {
	name: string;
	role: string;
	description: string;
	image: string;
}

export const developers: Developer[] = [
	{
		name: "Karishma Sonule",
		role: "Frontend Developer",
		description:
			"Specializes in creating visually appealing and highly interactive user interfaces using modern front-end frameworks. ",
		image: "/images/Karishma_Sonule.jpeg",
	},
	{
		name: "Jayshree Mulankar",
		role: "Backend Developer",
		description:
			"Expert in building efficient and secure server-side applications with a strong focus on database management and API development.",
		image: "/images/Jayshree_Mulankar.jpeg",
	},
	{
		name: "Shravani Wandhare",
		role: "Full Stack Developer",
		description:
			"Passionate about developing seamless web applications by integrating front-end designs with robust back-end functionality.",
		image: "/images/Shravani_Wandhare.jpeg",
	},
	{
		name: "Rutuja Panchabudhe",
		role: "Full Stack Developer",
		description:
			"Experienced in both client-side and server-side technologies, with a keen interest in performance optimization and scalable solutions.",
		image: "/images/Rutuja_Panchbudhe.jpeg",
	},
	{
		name: "Aakansha Tembhare",
		role: "Full Stack Developer",
		description:
			"Combines strong problem-solving skills with expertise in front-end and back-end technologies to build high-performance applications.",
		image: "/images/Akanksha_Tembhare.jpeg",
	},
	{
		name: "Pooja Vaidya",
		role: "Full Stack Developer",
		description:
			"Enthusiastic about creating full-fledged applications with a focus on usability, security, and efficiency.",
		image: "/images/Pooja_Vaidya.jpg",
	},
];
