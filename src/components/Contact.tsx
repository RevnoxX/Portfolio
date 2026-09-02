import FadeIn from "./FadeIn";

export default function Contact() {
  return (
    <section className="py-32 relative max-w-5xl mx-auto px-4">
      <FadeIn>
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--color-text)]">
            <span className="text-gray-400 font-light mr-4">05.</span> Contact
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
        </div>

        <div className="glass-card relative group overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
            {/* Sidebar / Info */}
            <div className="lg:col-span-2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white/40 relative">
              <div className="relative z-10 space-y-12">
                <div>
                  <h3 className="text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase mb-4">Get in Touch</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    Ready to initiate a new project or collaborate? Drop me a message.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="group/item">
                    <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Email</p>
                    <p className="text-[var(--color-text)] font-semibold transition-colors">mukund260406@gmail.com</p>
                  </div>
                  <div className="group/item">
                    <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Location</p>
                    <p className="text-[var(--color-text)] font-semibold transition-colors">Global / Remote</p>
                  </div>
                  <div className="group/item">
                    <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Socials</p>
                    <div className="flex gap-4 mt-2">
                      <a href="#" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors font-semibold text-sm">GitHub</a>
                      <a href="#" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors font-semibold text-sm">LinkedIn</a>
                      <a href="#" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors font-semibold text-sm">Twitter</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="lg:col-span-3 p-8 lg:p-12 space-y-10 bg-white/60 relative z-10 backdrop-blur-md">
              <div className="space-y-2 group/input">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest flex items-center gap-2">
                  Name
                </label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-gray-300 text-[var(--color-text)] py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400 font-medium"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest flex items-center gap-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-gray-300 text-[var(--color-text)] py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400 font-medium"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest flex items-center gap-2">
                  Message
                </label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border-b border-gray-300 text-[var(--color-text)] py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none placeholder:text-gray-400 font-medium"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <button 
                type="button"
                className="w-full py-4 bg-[var(--color-primary)] hover:bg-[#c96c53] text-white font-bold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
