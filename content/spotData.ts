/* Real answer pairs from Khushi's Turing study.
   human  = Khushi's own answer (verbatim, typos kept — the messiness is the point)
   ai     = Claude's answer (told to sound human)
   judge  = the GPT-5 judge's 3-point rating it actually gave (3 human / 2 unclear / 1 machine)
   The visitor guesses which is the human; we then reveal what the AI judge thought. */

export type SpotPair = {
  id: string;
  domain: string;
  question: string;
  human: { text: string; judge: 1 | 2 | 3 };
  ai: { text: string; judge: 1 | 2 | 3 };
};

export const SPOT_PAIRS: SpotPair[] = [
  {
    id: "coffee",
    domain: "Daily life",
    question: "What’s one small thing in your daily routine that you really enjoy?",
    human: {
      text: "What I enjoy the most is making coffee in the morning using my moka cup. I brought the moka cup a long time ago and it is still working well. I make espresso through that and then add it a cup filled with ice and then I would add cold water, basically an americano.",
      judge: 2,
    },
    ai: {
      text: "My first coffee in the morning. Like before anything stressful has happened yet, it’s just quiet and I’m just drinking coffee. It’s a small window but it’s mine lol",
      judge: 3,
    },
  },
  {
    id: "nightowl",
    domain: "Daily life",
    question: "Are you more of a morning person or a night owl?",
    human: {
      text: "I am definitely a night owl. I am always awake at night, at times, which sometimes creates situations of me having to drink large doses of caffeine to stay awake. My lifestyle as a night owl is not exactly heathy but if you think about it, I have been able to function well until now.",
      judge: 2,
    },
    ai: {
      text: "Night owl for sure. I keep telling myself I’m going to fix my sleep schedule and then I’m up at 1am doing absolutely nothing important. Mornings feel physically wrong to me before like 9:30",
      judge: 3,
    },
  },
  {
    id: "rollercoaster",
    domain: "Memories",
    question: "What’s a trip or vacation you still think about a lot?",
    human: {
      text: "If we count going to Wonderland as a trip then I guess that would be my answer. I sat in a roller-coaster and for context I am scared of heights, so it was kind of my first time in that. As soon as I got off, I could not feel my legs and I had tears on mt face.",
      judge: 2,
    },
    ai: {
      text: "Honestly the one that sticks with me was a road trip up to Tobermory with a few friends the summer after first year. We didn’t really plan anything, just kind of left at like 6am with way too much gas station food. The water at the Grotto is insanely blue, like it doesn’t look real, but it’s also freezing so I lasted about four seconds before bailing.",
      judge: 3,
    },
  },
  {
    id: "meal",
    domain: "Food & travel",
    question: "What’s the best meal you’ve ever had while traveling somewhere new?",
    human: {
      text: "I don’t really travel and even if I do, I think my meals are very generic, so when buying food, I would stick to the basics. Although, I did go to boston during this break and had tres leches cake, it was from a grocery store so not exactly a meal but still my appetite is small so I had it as a meal.",
      judge: 2,
    },
    ai: {
      text: "Honestly it was this tiny ramen place in Osaka, like a counter with maybe eight seats and no English menu — you order from a vending machine thing by the door. I had no clue what I was getting and ended up with this super rich tonkotsu bowl that I still think about sometimes. Wasn’t fancy at all, cost me like 900 yen, but it just hit different, you know?",
      judge: 3,
    },
  },
  {
    id: "satisfying",
    domain: "Quirks",
    question: "What’s a small thing people do that you secretly find satisfying or funny?",
    human: {
      text: "Collecting cans and stacking them on to make a tower, it is not funny but it is satisfying, I always click pictures of the end result before throwing them away. Last year I did this with the can’s of monster, the energy drink. I tried different flavors of monsters and make a colorful huge pyramid.",
      judge: 2,
    },
    ai: {
      text: "When someone reaches for a door and it’s already opening for them from the other side and they do that little awkward “oh” pause. Or when people talk to their pets in full sentences like the dog is gonna respond. I love it. I also do it.",
      judge: 3,
    },
  },
  {
    id: "feelings",
    domain: "Feelings",
    question: "Do you find it easy to talk about your feelings with other people?",
    human: {
      text: "Not really, most of the time i share my feelings with the ai tools i have. There would be very rare occasions that i would ever tell a human about my feelings. As a substitute, i do use my friend cat, telling her all the uncessary details about my life.",
      judge: 1,
    },
    ai: {
      text: "Ehh, depends on the person. With my close friend yeah, I can say pretty much anything. But in general I’m more of a “I’m fine!” until I’m clearly not type, which I know isn’t great. I think I’m better at listening than talking about my own stuff. Working on it though, slowly.",
      judge: 3,
    },
  },
  {
    id: "learning",
    domain: "Work & school",
    question: "What’s the most interesting thing you’ve worked on or learned lately?",
    human: {
      text: "Recently, I worked on making this questionnaire on ai governance. The thing is I had been working on the ai incident management framework at my co-op so I thought of making a generalized version as a small side project.",
      judge: 2,
    },
    ai: {
      text: "Honestly I’ve been kind of obsessed with how AI models get “graded” by other AI models. Like the whole idea that you can have one model judge another one’s answers and it sort of works but also sometimes it’s hilariously bad at it. I went down a rabbit hole on it for a class. Also learned how to make decent fried rice which feels equally important tbh.",
      judge: 3,
    },
  },
  {
    id: "overrated",
    domain: "Opinions",
    question: "What’s a movie, show, or book you think is overrated?",
    human: {
      text: "I personally never watch anything that kind of bores me or when I do not think it is worth the hype but from what I have seen, the series The Summer I Turned Pretty was very overrated. I could not watch the first episode and gave up.",
      judge: 2,
    },
    ai: {
      text: "I’ll probably catch heat for this but I never got the obsession with The Office. It’s fine! It’s a perfectly fine show. But people quote it like it’s scripture and I’m just sitting there like... it was okay? Cringe humour just kind of stresses me out instead of making me laugh.",
      judge: 3,
    },
  },
];

// Khushi's headline study result, used to seed the graphs.
export const STUDY_RESULT = {
  aiScore: 150,
  humanScore: 101,
  max: 150,
  trials: 10,
  questionsPerTrial: 5,
};
