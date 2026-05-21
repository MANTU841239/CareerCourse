import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Star, Clock, Heart, GitCompare, Filter, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const allCourses = [
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
    category: 'Web Development',
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
    category: 'AI & Machine Learning',
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
    category: 'UI/UX Design',
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
    category: 'Cloud Computing',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    id: '5',
    title: 'Python for Data Science and Machine Learning',
    platform: 'Udemy',
    instructor: 'Jose Portilla',
    price: 0,
    rating: 4.6,
    reviews: 98765,
    duration: '28 hours',
    level: 'Beginner',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
  },
  {
    id: '6',
    title: 'React - The Complete Guide',
    platform: 'Udemy',
    instructor: 'Maximilian Schwarzmüller',
    price: 94.99,
    rating: 4.8,
    reviews: 234567,
    duration: '48 hours',
    level: 'Intermediate',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  },
  {
    id: '7',
    title: 'Ethical Hacking from Scratch',
    platform: 'Udemy',
    instructor: 'Zaid Sabih',
    price: 89.99,
    rating: 4.7,
    reviews: 67890,
    duration: '15 hours',
    level: 'Beginner',
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  },
  {
    id: '8',
    title: 'iOS App Development with Swift',
    platform: 'Coursera',
    instructor: 'University of Toronto',
    price: 0,
    rating: 4.5,
    reviews: 45678,
    duration: '6 months',
    level: 'Intermediate',
    category: 'Mobile App Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
  {
    id: '9',
    title: 'Digital Marketing Masterclass',
    platform: 'Udemy',
    instructor: 'Phil Ebiner',
    price: 69.99,
    rating: 4.6,
    reviews: 123456,
    duration: '23 hours',
    level: 'All Levels',
    category: 'Business & Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: '10',
    title: 'Deep Learning Specialization',
    platform: 'Coursera',
    instructor: 'Andrew Ng',
    price: 49.99,
    rating: 4.9,
    reviews: 189234,
    duration: '5 months',
    level: 'Advanced',
    category: 'AI & Machine Learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  },
  {
    id: '11',
    title: 'Figma UI/UX Design Essentials',
    platform: 'Udemy',
    instructor: 'Daniel Walter Scott',
    price: 74.99,
    rating: 4.7,
    reviews: 56789,
    duration: '21 hours',
    level: 'Beginner',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
  },
  {
    id: '12',
    title: 'Google Cloud Platform Fundamentals',
    platform: 'Coursera',
    instructor: 'Google Cloud',
    price: 0,
    rating: 4.6,
    reviews: 78901,
    duration: '1 week',
    level: 'Beginner',
    category: 'Cloud Computing',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
  },
];

export default function CoursesPage() {
  const [searchParams] = useSearchParams();
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCompare, removeFromCompare, isInCompare } = useApp();

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    platform: '',
    level: '',
    priceMin: '',
    priceMax: '',
    rating: '',
    duration: '',
    isFree: false,
  });

  const filteredCourses = allCourses.filter((course) => {
    if (filters.search && !course.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.category && course.category !== filters.category) return false;
    if (filters.platform && course.platform !== filters.platform) return false;
    if (filters.level && course.level !== filters.level) return false;
    if (filters.priceMin && course.price < parseFloat(filters.priceMin)) return false;
    if (filters.priceMax && course.price > parseFloat(filters.priceMax)) return false;
    if (filters.rating && course.rating < parseFloat(filters.rating)) return false;
    if (filters.isFree && course.price > 0) return false;
    return true;
  });

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      platform: '',
      level: '',
      priceMin: '',
      priceMax: '',
      rating: '',
      duration: '',
      isFree: false,
    });
  };

  const handleWishlistToggle = (course: typeof allCourses[0]) => {
    if (isInWishlist(course.id)) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist({
        id: course.id,
        title: course.title,
        platform: course.platform,
        price: course.price,
        rating: course.rating,
        image: course.image,
      });
    }
  };

  const handleCompareToggle = (course: typeof allCourses[0]) => {
    if (isInCompare(course.id)) {
      removeFromCompare(course.id);
    } else {
      addToCompare({
        id: course.id,
        title: course.title,
        platform: course.platform,
        price: course.price,
        rating: course.rating,
        image: course.image,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl mb-4">Browse All Courses</h1>
          <p className="text-white/90">Explore {allCourses.length} courses from top platforms</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block fixed lg:static inset-0 z-40 lg:z-0 bg-background lg:bg-transparent`}>
            <div className="lg:w-64 bg-card border border-border rounded-xl p-6 h-fit lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>
                <button onClick={() => setShowFilters(false)} className="lg:hidden">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                  >
                    <option value="">All Categories</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Business & Marketing">Business & Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Platform</label>
                  <select
                    value={filters.platform}
                    onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                  >
                    <option value="">All Platforms</option>
                    <option value="Udemy">Udemy</option>
                    <option value="Coursera">Coursera</option>
                    <option value="edX">edX</option>
                    <option value="A Cloud Guru">A Cloud Guru</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Skill Level</label>
                  <select
                    value={filters.level}
                    onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                  >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isFree}
                      onChange={(e) => setFilters({ ...filters, isFree: e.target.checked })}
                      className="w-4 h-4 rounded border-border"
                    />
                    Free Courses Only
                  </label>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-muted-foreground">
                  Showing {filteredCourses.length} of {allCourses.length} courses
                </p>
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <Link to={`/courses/${course.id}`}>
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </Link>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium">
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <button
                        onClick={() => handleWishlistToggle(course)}
                        className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                          isInWishlist(course.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(course.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleCompareToggle(course)}
                        className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                          isInCompare(course.id)
                            ? 'bg-secondary text-white'
                            : 'bg-white/90 text-gray-700 hover:bg-secondary hover:text-white'
                        }`}
                      >
                        <GitCompare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-primary font-medium mb-2">{course.platform}</div>
                    <Link to={`/courses/${course.id}`}>
                      <h3 className="text-sm font-medium mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </Link>
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
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No courses found matching your filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
