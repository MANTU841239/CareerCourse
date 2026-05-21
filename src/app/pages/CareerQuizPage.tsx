import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: 'What interests you most?',
    options: [
      { value: 'building-things', label: 'Building websites and applications', icon: '🏗️' },
      { value: 'data-analysis', label: 'Analyzing data and finding insights', icon: '📊' },
      { value: 'creative-design', label: 'Creating beautiful designs and experiences', icon: '🎨' },
      { value: 'problem-solving', label: 'Solving complex technical problems', icon: '🧩' },
      { value: 'business', label: 'Growing businesses and marketing', icon: '📈' },
    ],
  },
  {
    id: 2,
    question: 'What is your current experience level?',
    options: [
      { value: 'complete-beginner', label: 'Complete beginner - new to this field', icon: '🌱' },
      { value: 'some-knowledge', label: 'Some knowledge - taken a few courses', icon: '📚' },
      { value: 'intermediate', label: 'Intermediate - built a few projects', icon: '🛠️' },
      { value: 'advanced', label: 'Advanced - working professionally', icon: '🚀' },
    ],
  },
  {
    id: 3,
    question: 'What is your primary goal?',
    options: [
      { value: 'career-change', label: 'Change careers completely', icon: '🔄' },
      { value: 'upskill', label: 'Learn new skills for current job', icon: '⬆️' },
      { value: 'side-project', label: 'Build side projects or freelance', icon: '💡' },
      { value: 'explore', label: 'Explore and learn something new', icon: '🔍' },
    ],
  },
  {
    id: 4,
    question: 'How much time can you dedicate to learning?',
    options: [
      { value: '1-5-hours', label: '1-5 hours per week', icon: '⏱️' },
      { value: '5-10-hours', label: '5-10 hours per week', icon: '⏰' },
      { value: '10-20-hours', label: '10-20 hours per week', icon: '🕐' },
      { value: 'full-time', label: 'Full-time learning (20+ hours)', icon: '🎯' },
    ],
  },
  {
    id: 5,
    question: 'What type of work environment appeals to you?',
    options: [
      { value: 'remote', label: 'Remote work from anywhere', icon: '🌍' },
      { value: 'startup', label: 'Fast-paced startup environment', icon: '🚀' },
      { value: 'corporate', label: 'Stable corporate environment', icon: '🏢' },
      { value: 'freelance', label: 'Freelance and independent work', icon: '💼' },
    ],
  },
];

const careerPaths: Record<string, any> = {
  'web-developer': {
    title: 'Web Developer',
    description: 'Build modern websites and web applications using the latest technologies',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Databases'],
    salary: '$70k - $130k',
    demand: 'Very High',
    courses: [
      { id: '1', title: 'Complete Web Development Bootcamp', platform: 'Udemy', rating: 4.7 },
      { id: '6', title: 'React - The Complete Guide', platform: 'Udemy', rating: 4.8 },
    ],
  },
  'data-scientist': {
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make better decisions',
    skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization', 'SQL'],
    salary: '$85k - $150k',
    demand: 'Very High',
    courses: [
      { id: '5', title: 'Python for Data Science and Machine Learning', platform: 'Udemy', rating: 4.6 },
      { id: '2', title: 'Machine Learning Specialization', platform: 'Coursera', rating: 4.9 },
    ],
  },
  'ux-designer': {
    title: 'UX/UI Designer',
    description: 'Create beautiful and intuitive user experiences for digital products',
    skills: ['Figma', 'User Research', 'Prototyping', 'Visual Design', 'Interaction Design'],
    salary: '$65k - $120k',
    demand: 'High',
    courses: [
      { id: '3', title: 'UI/UX Design Masterclass', platform: 'Udemy', rating: 4.8 },
      { id: '11', title: 'Figma UI/UX Design Essentials', platform: 'Udemy', rating: 4.7 },
    ],
  },
  'cloud-engineer': {
    title: 'Cloud Engineer',
    description: 'Design and manage cloud infrastructure for scalable applications',
    skills: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'DevOps', 'Networking'],
    salary: '$90k - $160k',
    demand: 'Very High',
    courses: [
      { id: '4', title: 'AWS Certified Solutions Architect', platform: 'A Cloud Guru', rating: 4.6 },
      { id: '12', title: 'Google Cloud Platform Fundamentals', platform: 'Coursera', rating: 4.6 },
    ],
  },
  'digital-marketer': {
    title: 'Digital Marketer',
    description: 'Grow businesses through online marketing strategies and campaigns',
    skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics', 'PPC'],
    salary: '$50k - $100k',
    demand: 'High',
    courses: [{ id: '9', title: 'Digital Marketing Masterclass', platform: 'Udemy', rating: 4.6 }],
  },
};

function getRecommendation(answers: Record<number, string>) {
  const interest = answers[1];

  if (interest === 'building-things') return 'web-developer';
  if (interest === 'data-analysis') return 'data-scientist';
  if (interest === 'creative-design') return 'ux-designer';
  if (interest === 'problem-solving') return 'cloud-engineer';
  if (interest === 'business') return 'digital-marketer';

  return 'web-developer';
}

export default function CareerQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendation, setRecommendation] = useState<string>('');

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = getRecommendation(answers);
      setRecommendation(result);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendation('');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[questions[currentQuestion]?.id];
  const career = careerPaths[recommendation];

  if (showResults && career) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-primary to-secondary text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Your Personalized Results</span>
            </div>
            <h1 className="text-3xl md:text-4xl mb-4">Your Recommended Career Path</h1>
            <p className="text-white/90 text-lg">Based on your answers, here's what we suggest</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8 border border-primary/20">
            <h2 className="text-2xl md:text-3xl mb-3">{career.title}</h2>
            <p className="text-lg text-muted-foreground mb-6">{career.description}</p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Average Salary</span>
                </div>
                <div className="text-xl font-bold">{career.salary}</div>
              </div>

              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Job Demand</span>
                </div>
                <div className="text-xl font-bold">{career.demand}</div>
              </div>

              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Match Score</span>
                </div>
                <div className="text-xl font-bold">92%</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Key Skills to Learn</h3>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Recommended Courses for You</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {career.courses.map((course: any) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-xs text-primary font-medium">{course.platform}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <span>⭐</span>
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-medium mb-2 group-hover:text-primary transition-colors">{course.title}</h4>
                  <div className="flex items-center text-primary text-sm font-medium">
                    View Course
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h3 className="font-semibold mb-3">Next Steps</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="font-medium">Explore the recommended courses</div>
                  <div className="text-sm text-muted-foreground">Review the curriculum and choose a course that fits your schedule</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="font-medium">Start learning and building projects</div>
                  <div className="text-sm text-muted-foreground">Apply what you learn by creating real-world projects</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="font-medium">Build your portfolio and network</div>
                  <div className="text-sm text-muted-foreground">Showcase your work and connect with professionals in the field</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  4
                </div>
                <div>
                  <div className="font-medium">Apply for jobs or start freelancing</div>
                  <div className="text-sm text-muted-foreground">Begin your new career with confidence</div>
                </div>
              </li>
            </ol>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center gap-2"
            >
              Browse All Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleRestart}
              className="px-8 py-3 border-2 border-border rounded-lg hover:bg-accent transition-colors font-medium"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-secondary text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl mb-4 text-center">Career Path Quiz</h1>
          <p className="text-white/90 text-lg text-center">Answer a few questions to discover your ideal learning path</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-xl md:text-2xl mb-8">{questions[currentQuestion].question}</h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:border-primary hover:bg-primary/5 ${
                  currentAnswer === option.value ? 'border-primary bg-primary/10' : 'border-border'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                  {currentAnswer === option.value && <CheckCircle className="w-5 h-5 text-primary ml-auto" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border-2 border-border rounded-lg hover:bg-accent transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
