import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Do not exit in serverless environment
  }
};

connectDB();

// --- Schemas ---

const ProfileSchema = new mongoose.Schema({
  name: String,
  role1: String,
  role2: String,
  residence: String,
  city: String,
  age: Number,
  languages: [{ label: String, value: Number }],
  skills: [{ label: String, value: Number }],
  tools: [String],
  githubUsername: String,
  yearsExperience: Number,
  completedProjects: Number,
  email: String,
  phone: String,
  address: String,
  socials: {
    linkedin: String,
    twitter: String,
    instagram: String,
    github: String,
    discord: String,
    telegram: String,
  }
});

const PROJECT_CATEGORIES = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Management', 'Design', 'Other'];

const ProjectSchema = new mongoose.Schema({
  title: String,
  category: { type: String, enum: PROJECT_CATEGORIES, default: 'Other' },
  images: { type: [String], validate: [v => v.length <= 5, 'Max 5 images'] },
  description: String,
  date: String,
  role: String,
  previewLink: String,
  githubLink: String,
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  image: String,
  tags: [String],
  date: String,
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
}, { timestamps: true });

const CertificateSchema = new mongoose.Schema({
  name: String,
  link: String,
  about: String,
  icon: String,
});

const TestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  text: String,
  image: String,
});

const TimelineSchema = new mongoose.Schema({
  type: { type: String, enum: ['Education', 'Experience'] },
  title: String,
  subtitle: String,
  duration: String,
  description: String,
});

const Profile = mongoose.model('Profile', ProfileSchema);
const Project = mongoose.model('Project', ProjectSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const Message = mongoose.model('Message', MessageSchema);
const Certificate = mongoose.model('Certificate', CertificateSchema);
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
const Timeline = mongoose.model('Timeline', TimelineSchema);

// --- Middleware ---

const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === process.env.ADMIN_TOKEN || token === 'admin123') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
};

// --- Routes ---

// Personal Info
app.get('/api/personal', asyncHandler(async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile || {});
}));

app.put('/api/personal', protect, asyncHandler(async (req, res) => {
  // Strip Mongoose internal fields to prevent update errors
  const { _id, __v, ...updateData } = req.body;
  let profile = await Profile.findOne();
  if (profile) {
    profile = await Profile.findByIdAndUpdate(
      profile._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  } else {
    profile = await Profile.create(updateData);
  }
  res.json(profile);
}));

// --- GitHub Stats Proxy ---
let githubCache = {
  data: null,
  timestamp: 0,
  username: null
};

app.get('/api/github-stats/:username', asyncHandler(async (req, res) => {
  const { username } = req.params;
  const CACHE_DURATION = 3600000; // 1 hour

  // Check cache
  if (githubCache.username === username && (Date.now() - githubCache.timestamp) < CACHE_DURATION) {
    return res.json(githubCache.data);
  }

  const token = process.env.GITHUB_TOKEN;
  const headers = {
    'Accept': 'application/vnd.github.cloak-preview',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    // Fetch Commits
    const commitRes = await fetch(`https://api.github.com/search/commits?q=author:${username}`, { headers });
    const commitData = await commitRes.json();
    
    // Fetch User Profile (for public_repos count)
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { ...headers, 'Accept': 'application/vnd.github.v3+json' }
    });
    const userData = await userRes.json();

    const stats = {
      commits: commitData.total_count || 0,
      repos: userData.public_repos || 0
    };

    // Update cache
    githubCache = {
      data: stats,
      timestamp: Date.now(),
      username
    };

    res.json(stats);
  } catch (err) {
    console.error('GitHub API error:', err);
    res.status(500).json({ error: 'Failed to fetch GitHub stats' });
  }
}));

// Projects
app.get('/api/projects', asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
}));

app.post('/api/projects', protect, asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
}));

app.put('/api/projects/:id', protect, asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
}));

app.delete('/api/projects/:id', protect, asyncHandler(async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project removed' });
}));

// Blogs
app.get('/api/blogs', asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
}));

app.post('/api/blogs', protect, asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
}));

app.put('/api/blogs/:id', protect, asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
}));

app.delete('/api/blogs/:id', protect, asyncHandler(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog removed' });
}));

// Messages (Inbox)
app.get('/api/messages', protect, asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
}));

app.post('/api/messages', asyncHandler(async (req, res) => {
  const message = await Message.create(req.body);
  res.status(201).json(message);
}));

app.delete('/api/messages/:id', protect, asyncHandler(async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: 'Message removed' });
}));

// Certificates
app.get('/api/certificates', asyncHandler(async (req, res) => {
  const certs = await Certificate.find();
  res.json(certs);
}));

app.post('/api/certificates', protect, asyncHandler(async (req, res) => {
  const cert = await Certificate.create(req.body);
  res.status(201).json(cert);
}));

app.delete('/api/certificates/:id', protect, asyncHandler(async (req, res) => {
  await Certificate.findByIdAndDelete(req.params.id);
  res.json({ message: 'Certificate removed' });
}));

// Testimonials
app.get('/api/testimonials', asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
}));

app.post('/api/testimonials', protect, asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json(testimonial);
}));

app.delete('/api/testimonials/:id', protect, asyncHandler(async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: 'Testimonial removed' });
}));

// Timeline
app.get('/api/timeline', asyncHandler(async (req, res) => {
  const timeline = await Timeline.find();
  res.json(timeline);
}));

app.post('/api/timeline', protect, asyncHandler(async (req, res) => {
  const entry = await Timeline.create(req.body);
  res.status(201).json(entry);
}));

app.delete('/api/timeline/:id', protect, asyncHandler(async (req, res) => {
  await Timeline.findByIdAndDelete(req.params.id);
  res.json({ message: 'Timeline entry removed' });
}));

export default app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
