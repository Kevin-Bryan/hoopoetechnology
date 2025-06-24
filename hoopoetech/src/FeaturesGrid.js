import React from 'react';
import {
  Share2,
  Mail,
  Users,
  DollarSign,
  ClipboardCheck,
  Calendar,
} from 'lucide-react';

function FeaturesGrid() {
  const features = [
    {
      title: 'Social Media Automation',
      description:
        'Schedule and publish posts across multiple platforms, analyze engagement metrics, and automate responses to increase brand presence.',
      icon: Share2,
    },
    {
      title: 'Email Management',
      description:
        'Automate email sorting, responses, and follow-ups to enhance communication efficiency and reduce manual workload.',
      icon: Mail,
    },
    {
      title: 'Lead Management',
      description:
        'Capture, track, and nurture leads automatically, integrating CRM systems to streamline sales processes.',
      icon: Users,
    },
    {
      title: 'Invoice and Billing',
      description:
        'Generate and send invoices automatically, track payments, and integrate with accounting software for seamless financial management.',
      icon: DollarSign,
    },
    {
      title: 'Project Management',
      description:
        'Automate task assignments, progress tracking, and deadline reminders to improve team collaboration and project delivery.',
      icon: ClipboardCheck,
    },
    {
      title: 'Event Management',
      description:
        'Automate event sign-ups, confirmations, and reminders, integrating with calendar and email systems for efficient event coordination.',
      icon: Calendar,
    },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes highlight {
          0%, 16.66% {
            background-position: -200% 0;
            opacity: 0.3;
          }
          20%, 26.66% {
            background-position: 0% 0;
            opacity: 1;
          }
          30%, 100% {
            background-position: 200% 0;
            opacity: 0.3;
          }
        }

        .animate-highlight {
          background: linear-gradient(
            90deg,
            rgba(75, 85, 99, 0.8) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(75, 85, 99, 0.8) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: highlight 18s ease-in-out infinite;
        }

        .feature-0 .animate-highlight {
          animation-delay: 0s;
        }
        .feature-1 .animate-highlight {
          animation-delay: 3s;
        }
        .feature-2 .animate-highlight {
          animation-delay: 6s;
        }
        .feature-3 .animate-highlight {
          animation-delay: 9s;
        }
        .feature-4 .animate-highlight {
          animation-delay: 12s;
        }
        .feature-5 .animate-highlight {
          animation-delay: 15s;
        }

        .text-default {
          color: rgba(156, 163, 175, 1);
        }
      `}</style>
      
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`feature-${index} bg-gray-900 text-center p-6 rounded-lg border border-gray-800 shadow-md transition duration-300 hover:border-white hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.5)]`}
            >
              <div className="mb-4">
                <feature.icon
                  className="h-12 w-12 text-white mx-auto md:h-16 md:w-16 lg:h-20 lg:w-20 transform transition duration-300 hover:rotate-180"
                />
              </div>
              <h3 className="text-lg text-white font-bold text-default animate-highlight mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base lg:text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FeaturesGrid;