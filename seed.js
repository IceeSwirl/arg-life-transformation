const mongoose = require('mongoose');
const Identity = require('./models/Identity');
const Challenge = require('./models/Challenge');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/arg-game', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Seed identities
const identities = [
  {
    name: "High Fashion Influencer",
    description: "Master the art of style and become a fashion authority",
    category: "fashion",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332-3fc1-4c5b-9c8a-2c6a9e8b8c8c?w=150",
    attributes: {
      style: ["minimalist", "avant-garde", "streetwear", "luxury"],
      habits: ["plan outfits night before", "follow fashion weeks", "curate wardrobe"],
      skills: ["styling", "photography", "social media", "trend forecasting"],
      networks: ["fashion designers", "photographers", "stylists", "models"],
      environment: ["minimalist closet", "good lighting", "full-length mirror"]
    },
    difficulty: "intermediate"
  },
  {
    name: "Elite Athlete",
    description: "Transform into a peak performance machine",
    category: "athlete",
    avatar: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=150",
    attributes: {
      style: ["athleisure", "performance wear", "clean cuts"],
      habits: ["5am workouts", "meal prep", "recovery routines"],
      skills: ["strength training", "nutrition", "mental toughness", "discipline"],
      networks: ["trainers", "athletes", "nutritionists", "coaches"],
      environment: ["home gym", "meal prep containers", "recovery tools"]
    },
    difficulty: "advanced"
  },
  {
    name: "Tech Entrepreneur",
    description: "Build the mindset of a successful startup founder",
    category: "entrepreneur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    attributes: {
      style: ["smart casual", "minimal", "tech-forward"],
      habits: ["reading industry news", "networking", "productivity systems"],
      skills: ["pitching", "networking", "product development", "fundraising"],
      networks: ["investors", "founders", "mentors", "advisors"],
      environment: ["clean workspace", "whiteboard", "tech setup"]
    },
    difficulty: "intermediate"
  },
  {
    name: "Master Craftsman",
    description: "Develop artisan-level skills in your chosen craft",
    category: "craftsman",
    avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150",
    attributes: {
      style: ["functional", "quality-focused", "timeless"],
      habits: ["daily practice", "tool maintenance", "skill development"],
      skills: ["precision", "patience", "quality control", "technique"],
      networks: ["master craftspeople", "suppliers", "clients", "apprentices"],
      environment: ["organized workspace", "quality tools", "inspiration board"]
    },
    difficulty: "beginner"
  }
];

// Seed challenges for High Fashion Influencer
const fashionChallenges = [
  {
    title: "Style Your Current Outfit for a Runway",
    description: "Transform your current clothes into a runway-ready look",
    type: "micro-habit",
    difficulty: "easy",
    instructions: [
      "Take everything you're wearing right now",
      "Style it differently - tuck, roll, layer, accessorize",
      "Take a photo that looks like a fashion shot",
      "Post with #ARGRunwayChallenge"
    ],
    verification: { type: "photo", criteria: "Runway-ready styling of current outfit" },
    arOverlay: {
      enabled: true,
      marker: "fashion-overlay",
      instructions: "Use AR to see virtual fashion accessories"
    }
  },
  {
    title: "Create a Mood Board for Your Style",
    description: "Build a visual representation of your target aesthetic",
    type: "environment",
    difficulty: "medium",
    instructions: [
      "Collect 10-15 images that represent your style goal",
      "Create a physical or digital mood board",
      "Include colors, textures, silhouettes you want",
      "Place it where you'll see it daily"
    ],
    verification: { type: "photo", criteria: "Completed mood board with explanation" }
  },
  {
    title: "Network with Fashion People",
    description: "Connect with 3 people in the fashion industry",
    type: "network",
    difficulty: "hard",
    instructions: [
      "Find local fashion events or meetups",
      "Attend and introduce yourself to 3 people",
      "Get their contact info and follow up",
      "Schedule coffee with at least one person"
    ],
    verification: { type: "text", criteria: "Names and context of 3 new fashion connections" }
  }
];

// Seed challenges for Elite Athlete
const athleteChallenges = [
  {
    title: "Morning Routine Lock-in",
    description: "Establish a 5am workout routine for 7 days",
    type: "micro-habit",
    difficulty: "medium",
    instructions: [
      "Set alarm for 5am tomorrow",
      "Prepare clothes and water bottle tonight",
      "Complete 30min workout before 6am",
      "Track each day with photo proof"
    ],
    verification: { type: "photo", criteria: "Daily 5am workout proof for 7 days" }
  },
  {
    title: "Meal Prep Sunday",
    description: "Prepare all meals for the upcoming week",
    type: "environment",
    difficulty: "medium",
    instructions: [
      "Plan meals for entire week",
      "Shop for ingredients",
      "Cook and portion all meals",
      "Organize in meal prep containers"
    ],
    verification: { type: "photo", criteria: "7 days of meal prep containers" }
  }
];

// Seed challenges for Tech Entrepreneur
const entrepreneurChallenges = [
  {
    title: "Elevator Pitch Practice",
    description: "Perfect your 30-second pitch and test it on 5 people",
    type: "social",
    difficulty: "medium",
    instructions: [
      "Write and memorize a 30-second elevator pitch",
      "Practice in mirror 10 times",
      "Deliver to 5 different people",
      "Get feedback and iterate"
    ],
    verification: { type: "text", criteria: "Pitch script and 5 feedback summaries" }
  },
  {
    title: "Build Your Network Map",
    description: "Create a visual map of your current and target network",
    type: "network",
    difficulty: "easy",
    instructions: [
      "List all current professional connections",
      "Identify gaps in your network",
      "Research 10 target connections",
      "Create outreach plan for each"
    ],
    verification: { type: "photo", criteria: "Network map with target connections identified" }
  }
];

async function seed() {
  try {
    // Clear existing data
    await Identity.deleteMany({});
    await Challenge.deleteMany({});
    
    // Seed identities
    const createdIdentities = await Identity.insertMany(identities);
    
    // Seed challenges with identity references
    const fashionIdentity = createdIdentities.find(i => i.name === "High Fashion Influencer");
    const athleteIdentity = createdIdentities.find(i => i.name === "Elite Athlete");
    const entrepreneurIdentity = createdIdentities.find(i => i.name === "Tech Entrepreneur");
    
    const challenges = [
      ...fashionChallenges.map(c => ({ ...c, identity: fashionIdentity._id })),
      ...athleteChallenges.map(c => ({ ...c, identity: athleteIdentity._id })),
      ...entrepreneurChallenges.map(c => ({ ...c, identity: entrepreneurIdentity._id }))
    ];
    
    await Challenge.insertMany(challenges);
    
    console.log('Database seeded successfully!');
    console.log(`${createdIdentities.length} identities created`);
    console.log(`${challenges.length} challenges created`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();