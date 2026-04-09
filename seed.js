import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const ProfileSchema = new mongoose.Schema({
  name: String, role1: String, role2: String, residence: String, city: String, age: Number,
  languages: [{ label: String, value: Number }], skills: [{ label: String, value: Number }], tools: [String], profileImage: String,
});

const ProjectSchema = new mongoose.Schema({
  title: String, category: String, image: String, images: [String], description: String, client: String, date: String, role: String,
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
  title: String, excerpt: String, content: String, image: String, tags: [String], date: String,
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({ title: String, description: String });
const TestimonialSchema = new mongoose.Schema({ name: String, role: String, text: String, image: String });
const TimelineSchema = new mongoose.Schema({ type: String, title: String, subtitle: String, duration: String, description: String });

const Profile = mongoose.model('Profile', ProfileSchema);
const Project = mongoose.model('Project', ProjectSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
const Timeline = mongoose.model('Timeline', TimelineSchema);

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB...');

    // 1. Profile
    await Profile.deleteMany({});
    await Profile.create({
      name: 'Vikash Maurya',
      role1: 'Front-end Developer',
      role2: 'UI/UX Designer',
      residence: 'India',
      city: 'Surat',
      age: 24,
      profileImage: '/images/profile.webp',
      languages: [{ label: 'Hindi', value: 100 }, { label: 'English', value: 90 }, { label: 'Gujarati', value: 100 }],
      skills: [{ label: 'HTML', value: 90 }, { label: 'CSS', value: 95 }, { label: 'JS', value: 75 }, { label: 'React', value: 85 }],
      tools: ['Bootstrap, Tailwind', 'Framer Motion, GSAP', 'Vite, Webpack', 'GIT knowledge']
    });

    // 2. Projects
    await Project.deleteMany({});
    await Project.create([
      { title: 'Agency Portfolio', category: 'Web Design', image: '/images/portfolio-1.webp', description: 'Modern agency site.', client: 'Envato', date: '2024', role: 'Lead Dev' }
    ]);

    // 3. Blogs
    await Blog.deleteMany({});
    await Blog.create([
      { title: 'Modern CSS Tips', excerpt: 'Learn advanced CSS.', content: 'Full content here.', image: '/images/blog-1.webp', date: '12.04.2024', tags: ['CSS', 'Web'] }
    ]);

    // 4. Services
    await Service.deleteMany({});
    await Service.create([
      { title: 'Web Development', description: 'Clean, modern, and responsive websites built with React.' },
      { title: 'UI/UX Design', description: 'user-centric designs that convert and wow.' }
    ]);

    // 5. Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.create([
      { name: 'Paul Trueman', role: 'Template Author', text: 'Exceptional quality and eye for detail.', image: '/images/testimonial-1.webp' }
    ]);

    // 6. Timeline
    await Timeline.deleteMany({});
    await Timeline.create([
      { type: 'Education', title: 'University of Tech', subtitle: 'B.Tech CS', duration: '2018 - 2022', description: 'Studied core computer science concepts.' },
      { type: 'Experience', title: 'Creative Agency', subtitle: 'Frontend Dev', duration: '2022 - Present', description: 'Working on high-end client projects.' }
    ]);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) { console.error(err); process.exit(1); }
};
seedData();
