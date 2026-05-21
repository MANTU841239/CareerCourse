import { useParams, Link } from 'react-router';
import { Star, Clock, Users, Globe, Heart, GitCompare, ArrowLeft, ExternalLink, CheckCircle, BarChart3 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const courseData: Record<string, any> = {
  '1': {
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
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    students: 823456,
    language: 'English',
    lastUpdated: 'March 2026',
    description:
      'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps.',
    whatYouLearn: [
      'Build 16 web development projects for your portfolio',
      'Learn the latest technologies, including Javascript, React, Node and Web3',
      'Build fully-fledged websites and web apps for your startup or business',
      'Master frontend development with React',
      'Master backend development with Node',
      'Learn professional developer best practices',
    ],
    requirements: ['No programming experience needed', 'A Mac or PC computer with access to the internet', 'Willingness to learn'],
    content: [
      { section: 'Front-End Web Development', lectures: 48, duration: '8h 30m' },
      { section: 'Introduction to Javascript ES6', lectures: 35, duration: '6h 15m' },
      { section: 'The Document Object Model (DOM)', lectures: 22, duration: '4h 45m' },
      { section: 'Backend Web Development', lectures: 56, duration: '9h 20m' },
      { section: 'React.js', lectures: 42, duration: '7h 50m' },
      { section: 'Web3 and Blockchain', lectures: 28, duration: '5h 30m' },
    ],
    platformPricing: [
      { platform: 'Udemy', price: 89.99, url: '#' },
      { platform: 'Udemy (Discounted)', price: 14.99, url: '#', discount: true },
      { platform: 'Skillshare', price: 0, url: '#', subscription: 'With membership' },
    ],
  },
  '2': {
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
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
    students: 542789,
    language: 'English',
    lastUpdated: 'February 2026',
    description: 'Master fundamental AI concepts and develop practical machine learning skills in the beginner-friendly, 3-course program by AI visionary Andrew Ng.',
    whatYouLearn: [
      'Build machine learning models in Python using NumPy & scikit-learn',
      'Build & train supervised models for prediction & binary classification',
      'Build & train a neural network with TensorFlow',
      'Apply best practices for ML development',
      'Build and understand decision trees and tree ensemble methods',
    ],
    requirements: ['Basic coding skills', 'High school level math', 'Willingness to learn advanced mathematics'],
    content: [
      { section: 'Supervised Machine Learning', lectures: 42, duration: '25h' },
      { section: 'Advanced Learning Algorithms', lectures: 38, duration: '22h' },
      { section: 'Unsupervised Learning', lectures: 36, duration: '20h' },
    ],
    platformPricing: [
      { platform: 'Coursera', price: 49.99, url: '#' },
      { platform: 'Coursera Plus', price: 59.99, url: '#', subscription: 'Monthly subscription' },
    ],
  },
};

const reviews = [
  {
    name: 'John Smith',
    rating: 5,
    date: 'April 2026',
    comment: 'Absolutely amazing course! The instructor explains everything clearly and the projects are very practical.',
    helpful: 2456,
  },
  {
    name: 'Maria Garcia',
    rating: 4,
    date: 'March 2026',
    comment: 'Great content and well-structured. Would have loved more advanced topics, but overall excellent for beginners.',
    helpful: 1234,
  },
  {
    name: 'David Chen',
    rating: 5,
    date: 'March 2026',
    comment: 'Best course I have ever taken. Worth every penny. The projects helped me build a solid portfolio.',
    helpful: 3456,
  },
  {
    name: 'Sarah Johnson',
    rating: 5,
    date: 'February 2026',
    comment: 'Crystal clear explanations and hands-on practice. I went from zero to building full-stack apps!',
    helpful: 1890,
  },
];

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCompare, removeFromCompare, isInCompare } = useApp();

  const course = courseData[courseId || '1'] || courseData['1'];

  const handleWishlistToggle = () => {
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

  const handleCompareToggle = () => {
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

  const ratingBreakdown = [
    { stars: 5, percentage: 72 },
    { stars: 4, percentage: 18 },
    { stars: 3, percentage: 6 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="text-sm text-white/80 mb-2">{course.category}</div>
              <h1 className="text-3xl md:text-4xl mb-4">{course.title}</h1>
              <p className="text-lg text-white/90 mb-4">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-white text-white" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-white/80">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-white/80">
                <span>Created by {course.instructor}</span>
                <span>•</span>
                <span>Last updated {course.lastUpdated}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{course.language}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-border">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-3xl font-bold text-foreground mb-4">${course.price}</div>

                  <div className="space-y-3 mb-6">
                    <button
                      onClick={handleWishlistToggle}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        isInWishlist(course.id)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(course.id) ? 'fill-current' : ''}`} />
                      {isInWishlist(course.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>

                    <button
                      onClick={handleCompareToggle}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        isInCompare(course.id)
                          ? 'bg-secondary text-white hover:bg-secondary/90'
                          : 'border-2 border-border hover:bg-accent'
                      }`}
                    >
                      <GitCompare className="w-4 h-4" />
                      {isInCompare(course.id) ? 'Remove from Compare' : 'Add to Compare'}
                    </button>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Duration</span>
                      <span className="text-foreground font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Level</span>
                      <span className="text-foreground font-medium">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Platform</span>
                      <span className="text-foreground font-medium">{course.platform}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="mb-4">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.whatYouLearn.map((item: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="mb-4">Course Content</h2>
              <div className="space-y-3">
                {course.content.map((section: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                    <div>
                      <h4 className="font-medium mb-1">{section.section}</h4>
                      <p className="text-sm text-muted-foreground">
                        {section.lectures} lectures • {section.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="mb-4">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="mb-4">Price Comparison Across Platforms</h2>
              <div className="space-y-4">
                {course.platformPricing.map((pricing: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                    <div>
                      <div className="font-medium">{pricing.platform}</div>
                      {pricing.subscription && <div className="text-xs text-muted-foreground">{pricing.subscription}</div>}
                      {pricing.discount && (
                        <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full inline-block mt-1">
                          Best Deal
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-bold">{pricing.price === 0 ? 'Free' : `$${pricing.price}`}</div>
                      <a
                        href={pricing.url}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                      >
                        Visit
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2>Student Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-2xl font-bold">{course.rating}</span>
                  <span className="text-muted-foreground">course rating</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Rating Breakdown</h3>
                {ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 w-16">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{item.stars}</span>
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-400 h-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="pb-6 border-b border-border last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        <div className="text-xs text-muted-foreground">
                          {review.helpful.toLocaleString()} people found this helpful
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">About the Instructor</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-sm text-muted-foreground">Course Instructor</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium">{course.rating} ⭐</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Reviews</span>
                    <span className="font-medium">{course.reviews.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-xl p-6">
                <h3 className="font-semibold mb-2">Ready to learn?</h3>
                <p className="text-sm text-white/90 mb-4">
                  Join {course.students.toLocaleString()}+ students already enrolled
                </p>
                <a
                  href="#"
                  className="block w-full px-4 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors font-medium text-center"
                >
                  Go to Official Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
