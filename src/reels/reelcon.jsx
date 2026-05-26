// 50 bilkul unique aur real-looking usernames
const uniqueUsers = [
  "rohit_sharma_45", "sneha_kapoor", "priya_verma", "aman_malik", "ishita_vlogs",
  "kabir_codes", "ananya_art", "vikram_rathore", "neha_gupta", "rahul_fitness",
  "pooja_travels", "amit_clicks", "divya_sharma", "sandeep_tech", "kriti_san",
  "deepak_vines", "shreya_melodies", "arjun_gym_addict", "megha_bakery", "varun_biker",
  "tanvi_designs", "kunals_kitchen", "riyak_12", "yash_singh_rajput", "nisha_explorer",
  "siddharth_99", "aditi_writes", "gaurav_gaming", "sakshi_nails", "manish_trends",
  "rhea_clouds", "akash_sky", "jyoti_makeup", "vivek_beats", "monika_green",
  "harsh_shutter", "payal_diaries", "abhishek_fit", "shweta_crafts", "pankaj_motors",
  "swati_bliss", "rohan_sharma", "kajal_styles", "tarun_frames", "sapna_dreams",
  "chetan_chef", "meenakshi_petals", "sanjay_gears", "twinkle_stars", "mayank_racer"
];

// In 50 usernames se match karti hui 50 alag-alag captions
const uniqueCaptions = [
  "Hit it hard in the nets today! 🏏🔥 #cricketlife",
  "Chilling scenes with friends! ☕✨ #weekend",
  "Weekend getaways be like... 🏔️🌲 #nature",
  "Just standard Dubai vibes. 🏙️✈️ #travel",
  "New vlog is live on my channel! Go check it out. 🎥❤️",
  "Late night coding sessions be like... 💻🚀 #javascript",
  "Spilled some colors on canvas today. 🎨👩‍🎨 #artwork",
  "Riding through the royal streets. 🏰👑 #heritage",
  "Success demands consistency. 💼📈 #motivation",
  "No pain, no gain. Back day done! 💪🏋️‍♂️ #gymlife",
  "Wanderlust and city dust. 🌆🎒 #travelgram",
  "Capturing moments, creating memories. 📸✨ #photography",
  "Saree not sorry! 💃❤️ #traditional",
  "Unboxing the beast today! Stay tuned. 📱🔥 #techunboxing",
  "Be your own kind of beautiful. ✨🌸 #selflove",
  "New comedy video dropping tonight! 🤣🔥 #staytuned",
  "Humming my favorite tune today. 🎤🎶 #musiclover",
  "Sore today, strong tomorrow. 💪😤 #fitnessgoals",
  "Freshly baked chocolate muffins! 🧁🍫 #bakinglove",
  "On the road again... 🏍️💨 #bikelife",
  "Designing my next big project. 📐💡 #uidesign",
  "Perfect Butter Chicken made from scratch. 🍗🤤 #foodie",
  "Live life in warm yellow. 💛✨ #goodvibes",
  "First post on Kilogram! 🚀🔥 #hello world",
  "Lost in the beauty of old alleyways. 🗺️🍂",
  "Chasing sunsets and big dreams. 🌅💭",
  "Ink is the static version of my thoughts. ✍️📖",
  "Clutched a 1v4 match today! 🎮🔥 #pubgmobile",
  "Nail art game on point today. 💅✨",
  "Dressing up is a form of good manners. 👔🕺",
  "Staring at the clouds all day. ☁️💙",
  "Look up, the sky is clear. 🌌✨",
  "Glance and glow makeup look. 💄✨",
  "Dropping a fresh new beat this Friday! 🎧🔥",
  "Plant mom duties. 🌿💚 #naturelover",
  "Framing the street chaos perfectly. 📸🚶‍♂️",
  "Dear diary, today was magical. ✨📔",
  "Cardio day complete! 🔥🏃‍♂️ #shredded",
  "DIY room decor tutorial coming soon. ✂️🏡",
  "Engine oil runs in my veins. 🚗💨 #carlover",
  "Peace is a state of mind. 🧘‍♀️🕊️",
  "Casual Sunday outfit check. 👕👟",
  "Fashion fades, style is eternal. 👠✨",
  "Life through a vintage lens. 🎞️🌾",
  "Dream big, sparkle more. ✨💭",
  "Spicing up things in the kitchen! 🌶️🍳",
  "Flowers always make people better. 💐🌹",
  "Gearing up for the next long ride. ⚙️🏍️",
  "Twinkle twinkle little star, do you know how amazing you are? ⭐",
  "Speed is relative, but racing is life. 🏎️🏁"
];
const number =Math.random()*200
const postno= Math.round(number)
const info = [];

// Loop chala kar dono arrays ko index wise jodh diya
for (let i = 0; i < postno; i++) {
  info.push({
    id: i + 1, // id: 1 se lekar 50 tak jayegi
    username: uniqueUsers[i],
    profileImg: `https://picsum.photos/100?random=${i + 10}`,
    postImg: `https://picsum.photos/400/500?random=${i + 200}`,
    caption: uniqueCaptions[i]
  });
}

export default info;