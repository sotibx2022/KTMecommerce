import PageHeader from '@/app/_components/pageHeader/PageHeader';
import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
interface JobPosition {
  title: string;
  location: string;
  employmentType: string;
  responsibilities: string[];
  requirements: string[];
}
const CareersPage: React.FC = () => {
  const jobPositions: JobPosition[] = [
    {
      title: 'Frontend Developer',
      location: 'Kathmandu',
      employmentType: 'Full-time',
      responsibilities: [
        'Develop responsive, user-friendly interfaces for our e-commerce platform',
        'Collaborate with designers to implement UI/UX improvements',
        'Optimize web performance across devices',
        'Write clean, maintainable code with proper documentation',
      ],
      requirements: [
        '2+ years experience with React.js or Vue.js',
        'Proficient in HTML5, CSS3, JavaScript (ES6+)',
        'Experience with RESTful APIs',
        'Familiarity with Git version control',
      ],
    },
    {
      title: 'Digital Marketing Specialist',
      location: 'Kathmandu',
      employmentType: 'Full-time',
      responsibilities: [
        'Develop and execute digital marketing campaigns',
        'Manage social media presence and content strategy',
        'Analyze campaign performance and optimize ROI',
        'Collaborate with vendors and influencers',
      ],
      requirements: [
        '3+ years digital marketing experience',
        'Proven track record with social media and PPC campaigns',
        'Strong analytical skills with Google Analytics',
        'Excellent written and verbal communication skills',
      ],
    },
    {
      title: 'Customer Support Representative',
      location: 'Kathmandu',
      employmentType: 'Full-time',
      responsibilities: [
        'Respond to customer inquiries via phone, email, and chat',
        'Resolve issues related to orders, payments, and deliveries',
        'Document customer interactions in CRM system',
        'Provide feedback to improve customer experience',
      ],
      requirements: [
        '1+ years customer service experience',
        'Excellent communication skills in English and Nepali',
        'Patient and empathetic demeanor',
        'Basic computer proficiency',
      ],
    },
  ];
  return (
    <div className="bg-background min-h-screen">
      {/* Why Join Us Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <PageHeader
            headerText="Why Choose EcommerceKTM?"
            icon={Star}
            headerTagline="Discover a thriving work environment and unmatched service excellence in the heart of the city."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primaryLight p-6 rounded-lg shadow-sm border-t-4 border-helper">
              <h3 className="text-xl font-bold text-primaryDark mb-3">Impactful Work</h3>
              <p className="text-background">
                Your contributions will directly shape the future of e-commerce in Kathmandu, helping local businesses thrive online.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border-t-4 border-helper">
              <h3 className="text-xl font-bold text-primaryDark mb-3">Growth Opportunities</h3>
              <p className="text-primaryLight">
                We invest in our team with training, mentorship, and clear paths for career advancement.
              </p>
            </div>
            <div className="bg-primaryLight p-6 rounded-lg shadow-sm border-t-4 border-helper">
              <h3 className="text-xl font-bold text-primaryDark mb-3">Great Culture</h3>
              <p className="text-background">
                Join a supportive, collaborative team that values work-life balance and celebrates success together.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Current Openings Section */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primaryDark mb-8 text-center">
            Current Job Openings
          </h2>
          <div className="space-y-6">
            {jobPositions.map((job, index) => (
              <div key={index} className="border border-primaryLight rounded-lg overflow-hidden">
                <div className="bg-primaryLight text-white p-4">
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-sm">{job.location} • {job.employmentType}</p>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-primaryDark mb-2">Responsibilities:</h4>
                  <ul className="list-disc pl-5 mb-4 text-primaryLight space-y-1">
                    {job.responsibilities.map((item, i) => (
                      <div className="responsibility flex  gap-1" key={i}>
                        <ChevronRight /><li >{item}</li>
                      </div>
                    ))}
                  </ul>
                  <h4 className="font-bold text-primaryDark mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 mb-6 text-primaryLight space-y-1">
                    {job.requirements.map((item, i) => (
                      <div className="responsibility flex  gap-1" key={i}>
                        <ChevronRight /><li>{item}</li>
                      </div>
                    ))}
                  </ul>
                  <Link
                    href="mailto:info@ecommercektm.com?subject=Application"
                    passHref
                    className='bg-helper text-background py-2 px-4 font-bold rounded-sm'
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Culture Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primaryDark mb-8 text-center">
            Our Culture
          </h2>
          <div className="grid md:grid-cols-2 gap-8 w-full">
            <div className="md:flex md:flex-col md:justify-between">
              <h3 className="text-2xl font-bold text-primaryDark mb-4">What It's Like to Work Here</h3>
              <div>
                <p className="text-primaryLight mb-4">
                  At Ecommerce KTM, we believe our people are our greatest asset. We foster an environment of collaboration, innovation, and continuous learning.
                </p>
                <p className="text-primaryLight mb-4">
                  Our team enjoys regular knowledge-sharing sessions, team-building activities, and opportunities to work on challenging projects that make a real difference in our community.
                </p>
                <p className="text-primaryLight">
                  We offer competitive compensation, flexible work arrangements, and a supportive atmosphere where everyone's voice is heard.
                </p>
              </div>
            </div>
            <div className="md:max-w-none md:flex md:items-center md:justify-end">
              <div className="aspect-video flex items-center justify-center max-w-[300px]">
                <img src="/assets/teamphoto.png" alt='team photo' className='w-full' />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-12 px-4 bg-background text-primaryDark">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Dream Role?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-6">
            We're always looking for talented individuals. Send us your resume and tell us how you can contribute to our team.
          </p>
          <a
            href="mailto:careers@ecommercektm.com"
            className="bg-helper text-primaryDark font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition duration-300 inline-block"
          >
            Send Your Resume
          </a>
        </div>
      </section>
    </div>
  );
};
export default CareersPage;