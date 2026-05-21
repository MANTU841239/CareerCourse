import { Link } from 'react-router';
import {
  Search,
  Code,
  Database,
  Brain,
  Palette,
  Shield,
  Cloud,
  Smartphone,
  TrendingUp,
  Star,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { useState } from 'react';

const categories = [
  { name: 'Web Development', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { name: 'Data Science', icon: Database, color: 'from-purple-500 to-pink-500' },
  { name: 'AI & Machine Learning', icon: Brain, color: 'from-indigo-500 to-purple-500' },
  { name: 'UI/UX Design', icon: Palette, color: 'from-pink-500 to-rose-500' },
  { name: 'Cybersecurity', icon: Shield, color: 'from-red-500 to-orange-500' },
  { name: 'Cloud Computing', icon: Cloud, color: 'from-cyan-500 to-blue-500' },
  { name: 'Mobile App Development', icon: Smartphone, color: 'from-green-500 to-emerald-500' },
  { name: 'Business & Marketing', icon: TrendingUp, color: 'from-orange-500 to-amber-500' },
];

const topCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    platform: 'Udemy',
    instructor: 'Angela Yu',
    price: 89.99,
    rating: 4.7,
    reviews: 278543,
    duration: '52 hours',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  },
  {
    id: '2',
    title: 'Machine Learning Specialization',
    platform: 'Coursera',
    instructor: 'Andrew Ng',
    price: 49.99,
    rating: 4.9,
    reviews: 156234,
    duration: '3 months',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    platform: 'Udemy',
    instructor: 'Daniel Walter Scott',
    price: 79.99,
    rating: 4.8,
    reviews: 89432,
    duration: '38 hours',
    level: 'All Levels',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    id: '4',
    title: 'AWS Certified Solutions Architect',
    platform: 'A Cloud Guru',
    instructor: 'Ryan Kroonenburg',
    price: 39.99,
    rating: 4.6,
    reviews: 124567,
    duration: '24 hours',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Developer',
    content: 'CourseCompass helped me transition from marketing to tech. I found the perfect bootcamp and landed my dream job in 6 months!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Data Analyst',
    content: 'The comparison feature is amazing. I saved hundreds of dollars by finding the same course on different platforms.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    content: 'The career quiz pointed me in the right direction. The personalized recommendations were spot-on!',
    rating: 5,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  return (
    <div className="w-full">
      <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Find the Best Courses for Your Future
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover courses from top platforms worldwide based on your interests, budget, and career goals.
            </p>

            <div className="bg-white rounded-xl shadow-2xl p-2 max-w-3xl mx-auto mb-8">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center bg-background/50 rounded-lg px-4">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search courses, skills, or career paths"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none px-3 py-3 text-foreground"
                  />
                </div>
                <Link
                  to={`/courses${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Search
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/courses"
                className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors font-medium inline-flex items-center gap-2"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/quiz"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-colors font-medium"
              >
                Take Career Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/courses?category=${encodeURIComponent(category.name)}`}
                className="group bg-card hover:shadow-lg rounded-xl p-6 transition-all duration-300 border border-border hover:border-primary/50"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-medium">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-accent to-muted rounded-2xl p-8 md:p-12">
            <h2 className="text-center mb-3">Get Personalized Recommendations</h2>
            <p className="text-center text-muted-foreground mb-8">Tell us about yourself and we'll suggest the perfect courses</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block mb-2 text-sm">Skill Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm">Budget</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="">Select budget</option>
                  <option value="free">Free</option>
                  <option value="under-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-plus">$100+</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm">Duration</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                  <option value="">Select duration</option>
                  <option value="short">Under 10 hours</option>
                  <option value="medium">10-50 hours</option>
                  <option value="long">50+ hours</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Show Recommended Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Top Rated Courses</h2>
              <p className="text-muted-foreground">Most popular courses from leading platforms</p>
            </div>
            <Link to="/courses" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium">
                    ${course.price}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-primary font-medium mb-2">{course.platform}</div>
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span>({course.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <span className="px-2 py-1 bg-accent rounded text-xs">{course.level}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-3">What Our Students Say</h2>
          <p className="text-center text-muted-foreground mb-12">Join thousands of learners who found their path</p>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-4 text-white">Not Sure Where to Start?</h2>
              <p className="text-white/90 mb-6">
                Take our free career quiz to discover your ideal learning path based on your interests, skills, and goals.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Personalized career path recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Curated course suggestions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Industry insights and salary information</span>
                </li>
              </ul>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors font-medium"
              >
                Start Career Quiz
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2">50K+</div>
                    <div className="text-sm text-white/80">Courses Listed</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2">100+</div>
                    <div className="text-sm text-white/80">Platforms</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2">2M+</div>
                    <div className="text-sm text-white/80">Students Helped</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2">4.8</div>
                    <div className="text-sm text-white/80">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
