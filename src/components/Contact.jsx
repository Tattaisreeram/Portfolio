import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { styles } from '../styles';
import { slideIn } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';
import GlobeCanvas from './canvas/Globe';

// TODO: Fill in your EmailJS keys in .env (see .env.example).
// VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Sreeram',
          from_email: form.email,
          to_email: 'tattaisreeram@gmail.com', // TODO: swap with your real address
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try the direct email link below.');
    }
    setLoading(false);
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {sent ? (
          <div className="mt-8 text-center">
            <p className="text-white text-xl font-bold">Message sent!</p>
            <p className="text-secondary mt-2">I'll get back to you soon.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="What's your name?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium focus:outline-none focus:ring-2 focus:ring-[#915EFF]"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="What's your email?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium focus:outline-none focus:ring-2 focus:ring-[#915EFF]"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="What do you want to say?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium focus:outline-none focus:ring-2 focus:ring-[#915EFF] resize-none"
              />
            </label>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary flex items-center gap-2 hover:bg-[#915EFF] transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send'}
              <Send size={16} />
            </button>
          </form>
        )}

        <div className="mt-10 flex gap-4 flex-wrap">
          <a
            href="mailto:tattaisreeram@gmail.com"
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
            <span className="text-sm">Email</span>
          </a>
          <a
            href="https://github.com/tattaisreeram"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
            <span className="text-sm">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/tatta-i-sreeram-794385257/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <GlobeCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
