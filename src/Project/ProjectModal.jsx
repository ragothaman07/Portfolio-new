import { motion } from "framer-motion";

const ProjectModal = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/70 backdrop-blur-sm">
     <motion.div
  className="relative max-w-2xl mx-4 border shadow-sm rounded-2xl bg-gradient-to-l from-[#06091f] to-[#161a31] border-white/10"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
>
  {/* Close button and image remain unchanged */}
  <div className="p-5">
    <h5 className="mb-3 text-3xl font-bold text-white">{title}</h5> {/* Larger title */}
    <p className="mb-4 text-lg font-normal text-neutral-300">{description}</p> {/* Larger paragraph */}
    {subDescription.map((subDesc, index) => (
      <p key={index} className="mb-3 text-lg font-normal text-neutral-300">
        {subDesc}
      </p>
    ))}
    <div className="flex items-center justify-between mt-6">
      <div className="flex gap-3">
        {tags.map((tag) => (
          <img
            key={tag.id}
            src={tag.path}
            alt={tag.name}
            className="w-10 h-10 rounded-lg hover:-translate-y-1 transition-transform duration-200"
          />
        ))}
      </div>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-lg font-medium text-white cursor-pointer hover:-translate-y-1 transition-transform duration-200"
        >
          View Project
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      )}
    </div>
  </div>
</motion.div>

    </div>
  );
};

export default ProjectModal;
