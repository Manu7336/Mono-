export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  dateNote: string;
  /**
   * Replace with your own photo URL or path in /public/photos/...
   * Leave empty ("") to display the romantic illustrated Polaroid placeholder,
   * or upload directly in the app's Customise mode.
   */
  imageUrl: string;
  aspect: 'portrait' | 'landscape' | 'square';
  rotation: number;
  illustrationTheme: 'pressed-rose' | 'sunset-glow' | 'starlight' | 'botanical-leaf' | 'morning-bloom' | 'two-hearts';
}

export interface PoemItem {
  id: string;
  title: string;
  theme: string;
  stanzas: string[][];
  dedication: string;
}

export interface OpenWhenLetter {
  id: string;
  envelopeLabel: string;
  subtitle: string;
  salutation: string;
  paragraphs: string[];
  closing: string;
  accentColor: string;
}

export interface TimelineMilestone {
  id: string;
  milestoneTitle: string;
  promptHint: string;
  date: string;
  memory: string;
  imageUrl?: string;
  imageUrls?: string[];
}

export interface VideoFrameItem {
  id: string;
  title: string;
  caption: string;
  /**
   * Place an MP4/MOV/WebM file in /public/videos/... and set videoUrl: "/videos/...",
   * or upload a short video directly in the app.
   */
  videoUrl: string;
  rotation: number;
}

export interface RomanticContent {
  projectName: string;
  recipientFullName: string;
  recipientFirstName: string;
  creatorName: string;
  tagline: string;
  opening: {
    subtitle: string;
    greeting: string;
    message: string;
    buttonLabel: string;
  };
  introduction: {
    heading: string;
    mainText: string;
    supportingMessage: string;
    heroPhotoCaption: string;
    heroPhotoDate: string;
    heroPhotoUrl: string;
  };
  memories: MemoryPhoto[];
  videoFrames: VideoFrameItem[];
  poems: PoemItem[];
  reasonsILoveYou: string[];
  openWhenLetters: OpenWhenLetter[];
  timeline: TimelineMilestone[];
  finalLetter: {
    heading: string;
    paragraphs: string[];
    closingLine1: string;
    closingLine2: string;
    signOff: string;
    photoUrl: string;
    photoCaption: string;
  };
  music: {
    trackTitle: string;
    trackSubtitle: string;
    /**
     * Place an MP3 file in /public/music/our-song.mp3 and set audioUrl: "/music/our-song.mp3".
     * When empty or not yet added, the player gracefully plays a gentle, dreamy music-box melody.
     */
    audioUrl: string;
  };
}

export const INITIAL_CONTENT: RomanticContent = {
  projectName: 'MONO MONO',
  recipientFullName: 'Natalie Karaliyo',
  recipientFirstName: 'Natalie',
  creatorName: '[MY NAME]',
  tagline: 'Just you. Just me. Just us. ALWAYS & FOREVER ❤️',

  opening: {
    subtitle: '',
    greeting: '',
    message:
      'Mono blo me, I made something special for you, just a little reminder of how much I LOVE YOU.',
    buttonLabel: 'Open Your Surprise ❤️',
  },

  introduction: {
    heading: 'For My Natalie ❤️',
    mainText: 'Welcome to our little world.',
    supportingMessage:
      "Sometimes words aren't enough to explain how much someone means to you. So I wanted to create something special, just for you. A little place filled with love, memories, poems and all the things I wish I could tell you every day.",
    heroPhotoCaption: 'Our Favourite Picture Together',
    heroPhotoDate: 'MONO MONO · Always & Forever',
    heroPhotoUrl: '',
  },

  memories: [
    {
      id: 'mem-1',
      title: 'Moment 01',
      caption: '',
      dateNote: '',
      imageUrl: '/photos/m1.jpg',
      aspect: 'portrait',
      rotation: -2.2,
      illustrationTheme: 'pressed-rose',
    },
    {
      id: 'mem-2',
      title: 'Moment 02',
      caption: '',
      dateNote: '',
      imageUrl: '/photos/m2.jpg',
      aspect: 'landscape',
      rotation: 1.8,
      illustrationTheme: 'sunset-glow',
    },
    {
      id: 'mem-3',
      title: 'Moment 03',
      caption: '',
      dateNote: '',
      imageUrl: '/photos/m3.jpg',
      aspect: 'square',
      rotation: -1.4,
      illustrationTheme: 'starlight',
    },
    {
      id: 'mem-4',
      title: 'Moment 04',
      caption: '',
      dateNote: '',
      imageUrl: '/photos/m4.jpg',
      aspect: 'portrait',
      rotation: 2.1,
      illustrationTheme: 'botanical-leaf',
    },
    {
      id: 'mem-5',
      title: 'Moment 05',
      caption: '',
      dateNote: '',
      imageUrl: '/photos/m5.jpg',
      aspect: 'square',
      rotation: -1.9,
      illustrationTheme: 'morning-bloom',
    },
    {
      id: 'mem-6',
      title: 'Moment 06',
      caption: '',
      dateNote: '',
      imageUrl: '/photos/m6.jpg',
      aspect: 'landscape',
      rotation: 1.5,
      illustrationTheme: 'two-hearts',
    },
    {
      id: 'mem-7',
      title: 'Moment 07',
      caption: '',
      dateNote: '',
      imageUrl: '/photos/m7.jpg',
      aspect: 'portrait',
      rotation: -1.7,
      illustrationTheme: 'pressed-rose',
    },
    {
      id: 'mem-8',
      title: 'Moment 08',
      caption: '',
      dateNote: '',
      imageUrl: '/photos/m8.jpg',
      aspect: 'square',
      rotation: 1.9,
      illustrationTheme: 'two-hearts',
    },
  ],

  videoFrames: [
    {
      id: 'vid-1',
      title: 'Reel 01',
      caption: '',
      videoUrl: '/videos/v1.mp4',
      rotation: -1.4,
    },
    {
      id: 'vid-2',
      title: 'Reel 02',
      caption: '',
      videoUrl: '/videos/v2.mp4',
      rotation: 1.2,
    },
    {
      id: 'vid-3',
      title: 'Reel 03',
      caption: '',
      videoUrl: '/videos/v3.mp4',
      rotation: 1.1,
    },
    {
      id: 'vid-4',
      title: 'Reel 04',
      caption: '',
      videoUrl: '/videos/v4.mp4',
      rotation: -1.3,
    },
    {
      id: 'vid-5',
      title: 'Reel 05',
      caption: '',
      videoUrl: '/videos/v5.mp4',
      rotation: 1.0,
    },
  ],

  poems: [
    {
      id: 'poem-1',
      title: 'The Light in Your Smile',
      theme: 'Her Beautiful Smile',
      stanzas: [
        [
          'Before a single word is spoken,',
          'Before the morning finds its light,',
          'One gentle curve upon your lips',
          'Turns heavy shadows soft and bright.',
        ],
        [
          'It is the warmth I look for first,',
          'The quiet peace at end of day,',
          'A sudden bloom of tender grace',
          'That sweeps the noisy world away.',
        ],
        [
          'If I could keep one earthly treasure,',
          'One steady star to guide me through,',
          'It would be the magic in the moment',
          'A happy smile wakes up in you.',
        ],
      ],
      dedication: 'For the smile that brightens my entire world.',
    },
    {
      id: 'poem-2',
      title: 'Rare Beyond Measure',
      theme: 'How Special She Is To Me',
      stanzas: [
        [
          'Some souls arrive like quiet music,',
          'Unrushed, unmistakable, and true,',
          'And suddenly the ordinary world',
          'Looks softer just because of you.',
        ],
        [
          'You carry kindness in your laughter,',
          'And grace inside the smallest things,',
          'A gentle strength that asks for nothing',
          'Yet gives my restless spirit wings.',
        ],
        [
          'Among a billion passing stories,',
          'No other heart could ever be',
          'So deeply cherished, deeply needed,',
          'As you, my Natalie, are to me.',
        ],
      ],
      dedication: 'Because there is truly no one else like you.',
    },
    {
      id: 'poem-3',
      title: 'The Joy You Bring',
      theme: 'The Happiness She Brings Into My Life',
      stanzas: [
        [
          'I used to think that happiness',
          'Was found in distant, grand designs,',
          'Until you walked into my days',
          'And rewrote every single line.',
        ],
        [
          'Now joy is in the way you listen,',
          'The way my heart lifts at your name,',
          'The quiet comfort of your presence',
          'That makes no two days feel the same.',
        ],
        [
          'You turned my ordinary hours',
          'Into a place I love to stay—',
          'My sweetest peace, my brightest morning,',
          'My favourite part of every day.',
        ],
      ],
      dedication: 'For every ordinary day you turn into magic.',
    },
    {
      id: 'poem-4',
      title: 'Mono Mono — Our Little World',
      theme: 'Our Connection',
      stanzas: [
        [
          'Two words that only we can carry,',
          'A secret language of our own,',
          'A sanctuary built of whispers',
          'Where neither heart is e’er alone.',
        ],
        [
          'No matter how the world is turning,',
          'Or what the noisy hours demand,',
          'Everything falls back into harmony',
          'The second that I hold your hand.',
        ],
        [
          'Mono Mono—heart to heart,',
          'A bond no distance can undo,',
          'My safest place, my truest tether,',
          'Begins and always ends with you.',
        ],
      ],
      dedication: 'For the bond that belongs only to the two of us.',
    },
    {
      id: 'poem-5',
      title: 'Choosing You Every Day',
      theme: 'Choosing Her Every Day',
      stanzas: [
        [
          'Love is not a single promise',
          'Spoken once and left behind;',
          'It is the quiet, daily choosing',
          'Of one beloved heart and mind.',
        ],
        [
          'In every season, bright or tender,',
          'Through every chapter yet to be,',
          'My answer stays the same forever:',
          'It is you, my love, my Natalie.',
        ],
        [
          'If given ten thousand different lifetimes,',
          'With every road laid out anew,',
          'In every world, in every heartbeat,',
          'I would still find and choose only you.',
        ],
      ],
      dedication: 'Today, tomorrow, and every day after.',
    },
    {
      id: 'poem-6',
      title: 'The Little Things',
      theme: 'Appreciating The Little Things',
      stanzas: [
        [
          'It is not only in the milestones',
          'That my affection grows so deep,',
          'It is the hundred tiny moments',
          'My grateful heart has learned to keep.',
        ],
        [
          'The way your eyes light up with wonder,',
          'The softness in your evening voice,',
          'The effortless and tender ways',
          'You make my heart rejoice.',
        ],
        [
          'Every little gesture matters,',
          'Every second shared is gold—',
          'You are the sweetest, dearest story',
          'My life could ever hope to hold.',
        ],
      ],
      dedication: 'For all the small, irreplaceable details that make you who you are.',
    },
  ],

  reasonsILoveYou: [
    'Your beautiful smile that instantly melts my heart.',
    'The way you make me laugh even when I am trying to be serious.',
    'Your genuine kindness toward the people around you.',
    'The way you brighten my entire day just by being in it.',
    'Your warm, magnetic personality.',
    'All the thoughtful little things you do without even realising.',
    'The unmistakable happiness I feel the moment I see you.',
    "Simply because you're you—authentic, rare, and irreplaceable.",
    'The softness in your voice when we talk softly together.',
    'How safe and at peace I feel whenever I am next to you.',
    'The sparkle in your eyes when you talk about something you love.',
    'How effortlessly you make ordinary moments feel unforgettable.',
    'Your gentle heart and the way you care so deeply.',
    'The way my heart still skips a beat when your name pops up.',
    'How easy it is to be my complete, unfiltered self around you.',
    'The warmth of your embrace that makes everything feel right.',
    'Your sense of humour and the inside jokes only we understand.',
    'How you listen with your whole heart.',
    'The grace and elegance you carry in everything you do.',
    'How you make our "Mono Mono" bond feel like magic.',
    'The way you look at me that makes me feel like the luckiest person alive.',
    'Your patience and understanding.',
    'How you turn a grey day into sunshine without even trying.',
    'The way your laugh sounds—my absolute favourite melody.',
    'How deeply I admire the person you are.',
    'The comfort of knowing we are always on the same team.',
    'Your sweetness that catches me off guard in the best way.',
    'How you inspire me to be a better version of myself every day.',
    'The quiet moments with you where no words are needed at all.',
    'How natural and right it feels to hold your hand.',
    'Your thoughtfulness in remembering the small details.',
    'The way you bring calm to my busiest days.',
    'Your beautiful energy that fills every room you walk into.',
    'How you make me smile at my phone like a fool.',
    'The honesty and trust we share between us.',
    'Your playful side that keeps life fun and full of warmth.',
    'How you never fail to make me feel appreciated.',
    'The way time flies whenever we are together.',
    'And the way a single second with you feels worth waiting for.',
    'Your radiant beauty, both inside and out.',
    'How you celebrate the good moments with so much joy.',
    'How comforting your presence is when things feel overwhelming.',
    'The way you say my name.',
    'Your inner strength and resilience.',
    'How every song about love suddenly makes sense because of you.',
    'The gentleness in the way you treat those you love.',
    'How you make the future look so bright and exciting.',
    'Your adorable expressions that I could watch forever.',
    'Because with you, "home" is a person, not a place.',
    'How you make love feel effortless, natural, and safe.',
    'The way you care about how my day went.',
    'Your enthusiasm for the little joys in life.',
    'How every memory with you becomes a treasure to me.',
    'The way you bring out my happiest, softest side.',
    'Your sincerity—nothing about your heart is ever pretend.',
    'How looking at you gives me a sense of pure gratitude.',
    'The way our conversations can flow for hours.',
    'Your warmth that feels like sunlight on a cold morning.',
    'How you understand what I am feeling before I even explain it.',
    'The little glances we share that say a thousand words.',
    'Your compassion and empathy.',
    'How being with you feels like my favourite daydream come true.',
    'The pride I feel whenever I think of you as my girlfriend.',
    'Your tender heart that makes this world a softer place.',
    'How you make every hello exciting and every goodbye hard.',
    'The way you bring harmony and sweetness into my life.',
    'Your unique perspective and the way your mind works.',
    'How you make me believe in deep, lasting romance.',
    'The way you make even the simplest plans feel special.',
    'Your loyalty and the steadiness of your heart.',
    'How my favourite part of any day is talking to you.',
    'The way your smile reaches all the way to your eyes.',
    'How you make me feel truly seen and understood.',
    'Your charm that won me over from the very beginning.',
    'And how I somehow fall for you even more as time goes on.',
    'The sweetness of your messages that I read more than once.',
    'How you bring light into spaces you do not even realise.',
    'Your authenticity and grace.',
    'The way you make my heart feel full to the brim.',
    'How you are both my greatest adventure and my safest harbour.',
    'Your tenderness in the moments that matter most.',
    'How I never get tired of learning more about you.',
    'The way you make me look forward to tomorrow.',
    'Your affectionate spirit that makes me feel so cherished.',
    'How even thinking of you brings a quiet smile to my face.',
    'The beauty of the connection we have built together.',
    'Your intuition and emotional warmth.',
    'How you make every season of life feel sweeter.',
    'The way you hold a special place in every single thought of mine.',
    'Your natural grace that leaves me in awe.',
    'How you turn small moments into lifelong memories.',
    'The way you make loving you the easiest thing I have ever done.',
    'Because you are my favourite hello and my hardest goodbye.',
    'How you make our little world—"Mono Mono"—my favourite place to be.',
    'Your kindness that never asks for applause.',
    'The way my heart knows it belongs with yours.',
    'How you make me feel luckier than I ever thought possible.',
    'Because every day with you is a gift I never take for granted.',
    'Because you are my Natalie—my love, my joy, my favourite person.',
    'And because even a hundred reasons is only the very beginning of why I love you. ❤️',
  ],

  openWhenLetters: [
    {
      id: 'env-miss-me',
      envelopeLabel: 'OPEN WHEN YOU MISS ME.',
      subtitle: 'For the moments when distance feels a little too quiet',
      salutation: 'My sweetest Natalie,',
      paragraphs: [
        'If you are opening this right now, it means we are apart for a little while—and I want you to know that wherever I am, a huge part of my heart is right there with you.',
        'Close your eyes for a second and take a slow breath. Imagine me holding your hand, pulling you close, and reminding you that we are always connected. Distance is only space on a map; it cannot touch what we have in our "Mono Mono" world.',
        'I am probably thinking about your smile right now, or counting down the moments until I get to see you and hear your voice again. Until then, let this little note be a warm hug from me to you.',
      ],
      closing: 'Missing you right back, always and completely ❤️',
      accentColor: '#1F7A56',
    },
    {
      id: 'env-bad-day',
      envelopeLabel: "OPEN WHEN YOU'RE HAVING A BAD DAY.",
      subtitle: 'When the world feels heavy and you need gentle comfort',
      salutation: 'My darling Natalie,',
      paragraphs: [
        'First, take a deep breath, relax your shoulders, and remember that you do not have to carry everything all at once. It is completely okay to have hard days, to feel tired, or to just need a quiet moment to rest.',
        'Please never forget how resilient, capable, and deeply special you are. One difficult day does not change how extraordinary you are or how much light you bring into this world.',
        'Be gentle with yourself today. Wrap yourself in warmth, take things one small step at a time, and remember that you have someone in your corner who loves you endlessly, believes in you completely, and is always here for you.',
      ],
      closing: 'Holding you close in my heart today and every day ❤️',
      accentColor: '#72B193',
    },
    {
      id: 'env-need-smile',
      envelopeLabel: 'OPEN WHEN YOU NEED A SMILE.',
      subtitle: 'A tiny prescription for my favourite smile in the world',
      salutation: 'Hey there, gorgeous,',
      paragraphs: [
        'Excuse me, Natalie Karaliyo, do you have any idea how unfairly cute you are? Because honestly, it should probably be illegal for one person to be this captivating and steal my attention as easily as you do.',
        'Right now, I am officially requesting one of your famous smiles—the one that makes your eyes light up and turns my whole day around in zero point two seconds.',
        'There it is! I knew you could not resist smiling at least a little bit. Keep that smile on your face, beautiful—it is hands down my favourite view in the entire universe.',
      ],
      closing: 'Your biggest fan, forever & always ❤️',
      accentColor: '#1F7A56',
    },
    {
      id: 'env-how-much-i-love-you',
      envelopeLabel: 'OPEN WHEN YOU NEED TO KNOW HOW MUCH I LOVE YOU.',
      subtitle: 'Whenever your heart wants a reminder of what you mean to me',
      salutation: 'My dearest Natalie,',
      paragraphs: [
        'If you ever wonder how much you mean to me, let me tell you clearly: having you in my life is one of the greatest blessings I have ever known.',
        'I love you not only for the big, unforgettable feelings, but for all the quiet, tender moments in between. I love the way you make my life brighter, softer, and fuller just by existing in it. I appreciate your heart, your warmth, your laughter, and every single detail that makes you who you are.',
        'You are cherished, you are adored, and you are never taken for granted. Yesterday, today, tomorrow, and for all the days to come—my heart chooses you.',
      ],
      closing: 'With every beat of my heart, MONO MONO ❤️',
      accentColor: '#1A3326',
    },
  ],

  timeline: [
    {
      id: 'story-1',
      milestoneTitle: 'Our first picture together.',
      promptHint: 'Where our story quietly began',
      date: '',
      memory: '',
      imageUrl: '/photos/a1.jpg',
      imageUrls: ['/photos/a1.jpg'],
    },
    {
      id: 'story-2',
      milestoneTitle: 'Our first conversation.',
      promptHint: 'The words that started everything',
      date: '',
      memory: '',
      imageUrl: '/photos/c1.jpg',
      imageUrls: ['/photos/c1.jpg'],
    },
    {
      id: 'story-3',
      milestoneTitle: 'The first time I brought you over to meet my family on my birthday',
      promptHint: 'A moment we will always hold close',
      date: '',
      memory: '',
      imageUrl: '/photos/wild1.jpg',
      imageUrls: [
        '/photos/wild1.jpg',
        '/photos/wild2.jpg',
        '/photos/wild3.jpg',
      ],
    },
    {
      id: 'story-4',
      milestoneTitle: 'Our trip to Sogeri.',
      promptHint: 'When my heart knew just how deep this was',
      date: '',
      memory: '',
      imageUrl: '/photos/s1.jpg',
      imageUrls: [
        '/photos/s1.jpg',
        '/photos/s2.jpg',
        '/photos/s3.jpg',
        '/photos/s4.jpg',
        '/photos/s5.jpg',
        '/photos/s6.jpg',
        '/photos/s7.jpg',
        '/photos/s8.jpg',
        '/photos/s9.jpg',
        '/photos/s10.jpg',
        '/photos/s11.jpg',
        '/photos/s12.jpg',
        '/photos/s13.jpg',
        '/photos/s14.jpg',
        '/photos/s15.jpg',
        '/photos/s16.jpg',
        '/photos/s17.jpg',
        '/photos/s18.jpg',
      ],
    },
    {
      id: 'story-5',
      milestoneTitle: 'Time together with your family',
      promptHint: 'Pure happiness from start to finish',
      date: '',
      memory: '',
      imageUrl: '/photos/h1.jpg',
      imageUrls: [
        '/photos/h1.jpg',
        '/photos/h2.jpg',
        '/photos/h3.jpg',
        '/photos/h4.jpg',
        '/photos/h5.jpg',
        '/photos/h6.jpg',
        '/photos/h7.jpg',
        '/photos/h8.jpg',
        '/photos/h9.jpg',
        '/photos/h10.jpg',
        '/photos/h11.jpg',
        '/photos/h12.jpg',
        '/photos/h13.jpg',
        '/photos/h14.jpg',
        '/photos/h15.jpg',
        '/photos/h16.jpg',
        '/photos/h17.jpg',
      ],
    },
    {
      id: 'story-6',
      milestoneTitle: 'Our time together at Wildlife.',
      promptHint: 'Our forever chapters yet to be written',
      date: '',
      memory: '',
      imageUrl: '/photos/w1.jpg',
      imageUrls: [
        '/photos/w1.jpg',
        '/photos/w2.jpg',
        '/photos/w3.jpg',
        '/photos/w4.jpg',
        '/photos/w5.jpg',
        '/photos/w6.jpg',
        '/photos/w7.jpg',
        '/photos/w8.jpg',
        '/photos/w9.jpg',
        '/photos/w10.jpg',
        '/photos/w11.jpg',
        '/photos/w12.jpg',
        '/photos/w13.jpg',
        '/photos/w14.jpg',
        '/photos/w15.jpg',
        '/photos/w16.jpg',
        '/photos/w17.jpg',
        '/photos/w18.jpg',
        '/photos/w19.jpg',
        '/photos/w20.jpg',
        '/photos/w21.jpg',
        '/photos/w22.jpg',
        '/photos/w23.jpg',
      ],
    },
    {
      id: 'story-7',
      milestoneTitle: 'Our time at Seraton',
      promptHint: 'A golden memory together',
      date: '',
      memory: '',
      imageUrl: '/photos/sera1.jpg',
      imageUrls: [
        '/photos/sera1.jpg',
        '/photos/sera2.jpg',
        '/photos/sera3.jpg',
        '/photos/sera4.jpg',
        '/photos/sera5.jpg',
        '/photos/sera6.jpg',
        '/photos/sera7.jpg',
        '/photos/sera8.jpg',
        '/photos/sera9.jpg',
        '/photos/sera10.jpg',
        '/photos/sera11.jpg',
        '/photos/sera12.jpg',
      ],
    },
    {
      id: 'story-8',
      milestoneTitle: 'Our time together at 5mile',
      promptHint: 'Sweet moments together',
      date: '',
      memory: '',
      imageUrl: '/photos/f1.jpg',
      imageUrls: [
        '/photos/f1.jpg',
        '/photos/f2.jpg',
        '/photos/f3.jpg',
        '/photos/f4.jpg',
        '/photos/f5.jpg',
        '/photos/f6.jpg',
        '/photos/f7.jpg',
        '/photos/f8.jpg',
        '/photos/f9.jpg',
        '/photos/f10.jpg',
        '/photos/f11.jpg',
        '/photos/f12.jpg',
        '/photos/f13.jpg',
        '/photos/f15.jpg',
        '/photos/f16.jpg',
        '/photos/f17.jpg',
        '/photos/f18.jpg',
      ],
    },
  ],

  finalLetter: {
    heading: 'Dear Natalie, My Mono ❤️',
    paragraphs: [
      'My Mono, the love of my life, and the future momo to my kids.',
      "I honestly don't think words will ever be enough to express just how deeply I am in love with you. But today, I want to try. I want you to know how much you mean to me, how grateful I am to have you in my life, and how much I appreciate everything you have been to me. Thank you for always being there for me, especially during the times when I had nothing. Thank you for believing in me, trusting me, supporting me, and never giving up on me, even when things weren't easy. You have stood by me through so much, and I hope you know that I will never take that for granted.",
      "Sometimes, I sit back and think about how everything started, and it honestly makes me smile. I still remember the very first time I messaged you on Facebook and how we had our first conversation. I remember thinking to myself that you were one of the smartest girls I had ever come across. You were ambitious, driven, intelligent, and had such a beautiful heart. There was just something about you that immediately caught my attention. Ngl, I think I fell for you right there and then. I just knew I wanted to meet you in person as soon as possible lol.",
      "And then, just one week after chatting on Facebook, we finally met at Gordons. I remember noticing how confidently you spoke and how you carried yourself. There was something about you that made me realise you were a strong woman, not just in the way you presented yourself but in the way you thought and expressed yourself. I remember thinking that if we were ever going to build something serious and lasting together, I would need someone like you by my side. Someone with a pure heart, a strong mindset, ambition, and the courage to face whatever life throws at us. I didn't know exactly what the future had in store for us, but something inside me told me that you were someone worth holding on to.",
      "Then came our first date, and within that same week, I took you to my family home at Wildlife to meet my family. Ngl, Mono, I was actually so nervous. I remember sweating the whole time before finally asking you to come over for my birthday and meet everyone hahaha. I wanted you to meet the people who meant the most to me, but at the same time, I really wanted them to love you as much as I was already beginning to.",
      "And when you finally came over, I couldn't help but notice the little things. I watched the way you greeted everyone, how you interacted with my family, especially the little kids, my cousins and siblings. I watched how naturally you carried conversations with my mum and how respectfully and warmly you treated everyone. It was in those little moments that I fell even more deeply in love with you.",
      "I remember looking at you and thinking to myself, *I've found her. I've finally found the girl of my dreams.* I genuinely felt like the luckiest guy in the world. I could already picture a future with you. I imagined marrying you, having children with you, building a beautiful family together, and spending the rest of my life waking up beside you. I knew that I didn't just want you as my girlfriend; I wanted you as my wife, my best friend, my life partner, and the mother of my children.",
      "And the best part? My family loved you too. They could see the kind of woman you were. They saw how intelligent, respectful, and caring you were, and I think they knew just as much as I did that you were someone special. Someone who would love me, look after me, challenge me to become a better man, and stand beside me through life.",
      "Nowww, after a few weeks to a month of dating, it was my turn to meet your family. THE ENGANS. Phewww! Hahahaha. I remember being a little nervous, but not too much. Then I finally got to meet your sisters, Ruthy and Rita, and some of your family at Club 22. I also got to meet Jonna and Merox, along with their beautiful kids, little Rosie and my bestie, little guy Joseph. And honestly, I loved all of them. Your family were so welcoming and lovely to me, and I could tell they wanted the best for you. They were happy to see us together, and that meant a lot to me.",
      'BUTTTTTT... then came Paps GK. HAHAHAHA!',
      "Mono, I don't think you understand how scared I was to meet your dad. Especially after hearing all the stories you had told me about him. I still remember that one time he caught us at Gordons Market and screamed at you in front of everyone. LOL! After hearing about that, I was honestly terrified hahaha. I was probably thinking about a hundred different ways that first meeting could go.",
      'But as time went by, things slowly changed. He eventually accepted me, understood that my intentions towards you were genuine, and realised that I wanted nothing but the best for you. He allowed us to continue building our relationship, and I eventually got to meet him a couple more times. Over time, we developed a mutual understanding and respect for one another.',
      'Looking back, I think Papa GK and I understood one very important thing about each other: we both wanted the same thing. We both wanted to see you happy. We both wanted you to be loved, protected, respected, and taken care of. And in our own ways, we both wanted the very best for you. I think that understanding brought us to a place where we could respect one another, and I will always appreciate that.',
      "And then came everything else. The beautiful memories, the laughter, the adventures, and all the little moments that made us who we are today. Of course, it wasn't always sunshine and rainbows. We went through our fair share of ups and downs. There were times when things were emotionally difficult, mentally exhausting, and even financially challenging. There were moments when life tested us in ways we probably never expected.",
      'But through it all, one thing remained constant: **we never stopped choosing each other.**',
      "We stayed by each other's side. We supported one another when things got difficult, picked each other up when one of us was down, and continued moving forward together. We may not have had everything figured out, and we may not have always gotten everything right, but we always had each other. And to me, that is what makes our love so special. It isn't just about loving each other when life is beautiful and everything is going our way. It's about holding on to each other when life gets difficult, choosing to understand one another, and continuing to fight for the love we share.",
      'Because every little moment, every memory, every challenge, and every experience led me to you. And if I had to live it all over again just to find you, I would.',
      'You are not just someone I fell in love with, Natalie. You are someone I want to grow with, build with, dream with, and grow old with. You are the woman I want beside me through every chapter of my life. The woman I want to celebrate my successes with, face my struggles with, raise a family with, and come home to every single day.',
      'I hope that when you look back at our journey, you see just how much you are loved. I hope you never doubt how special you are to me or how serious I am about the future I envision with you.',
      'I love you, my Mono. More than I could ever properly put into words.',
    ],
    closingLine1:
      "Here's to us, to our story, to the family we'll build, to the dreams we'll achieve, and to a lifetime of choosing each other.",
    closingLine2: 'Always and forever. my mono to infinity',
    signOff: '',
    photoUrl: '/photos/n1.jpg',
    photoCaption: 'Us — Always & Forever ❤️',
  },

  music: {
    trackTitle: 'Mono Mono Lullaby',
    trackSubtitle: 'Dreamy Music Box · Replaceable with your MP3',
    audioUrl: '/music/our-song.mp3',
  },
};
