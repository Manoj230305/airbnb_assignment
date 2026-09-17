// Living Room 1 (3 photos)
import living1_1 from '../assets/photo_tour/living1/1.jpeg';
import living1_2 from '../assets/photo_tour/living1/2.jpeg';
import living1_3 from '../assets/photo_tour/living1/3.jpeg';

// Living Room 2 (7 photos)
import living2_1 from '../assets/photo_tour/living2/1.jpeg';
import living2_2 from '../assets/photo_tour/living2/2.jpeg';
import living2_3 from '../assets/photo_tour/living2/3.jpeg';
import living2_4 from '../assets/photo_tour/living2/4.jpeg';
import living2_5 from '../assets/photo_tour/living2/5.jpeg';
import living2_6 from '../assets/photo_tour/living2/6.jpeg';
import living2_7 from '../assets/photo_tour/living2/7.jpeg';

// Full Kitchen (2 photos)
import kitchen1 from '../assets/photo_tour/k1.jpeg';
import kitchen2 from '../assets/photo_tour/k2.jpeg';

// Bedroom (6 photos)
import bedroom1 from '../assets/photo_tour/bedroom/1.jpeg';
import bedroom2 from '../assets/photo_tour/bedroom/2.jpeg';
import bedroom3 from '../assets/photo_tour/bedroom/3.jpeg';
import bedroom4 from '../assets/photo_tour/bedroom/4.jpeg';
import bedroom5 from '../assets/photo_tour/bedroom/5.jpeg';
import bedroom6 from '../assets/photo_tour/bedroom/6.jpeg';

// Full Bathroom (1 photo)
import bathroom1 from '../assets/photo_tour/bathroom1.jpeg';

// Gym (5 photos)
import gym1 from '../assets/photo_tour/gym/1.jpeg';
import gym2 from '../assets/photo_tour/gym/2.jpeg';
import gym3 from '../assets/photo_tour/gym/3.jpeg';
import gym4 from '../assets/photo_tour/gym/4.jpeg';
import gym5 from '../assets/photo_tour/gym/5.jpeg';

// Exterior (Uploaded photos)
import exterior1 from '../assets/photo_tour/exterior1.jpeg';
import exterior2 from '../assets/photo_tour/exterior2.jpeg';
import exterior3 from '../assets/photo_tour/exterior3.jpeg';

// Pool (3 photos)
import pool1 from '../assets/photo_tour/p1.jpeg';
import pool2 from '../assets/photo_tour/p2.jpeg';
import pool3 from '../assets/photo_tour/p3.jpeg';

export const photoTourCategories = [
  {
    id: 'living1',
    title: 'Living room 1',
    count: 3,
    amenities: 'Sofa · Air conditioning · Ceiling fan · TV',
    coverImage: living1_1,
    photos: [
      { url: living1_1, caption: 'Warm and inviting living room with amber sectional sofa and dining area' },
      { url: living1_2, caption: 'Living room entertainment setup with flat screen TV and credenza' },
      { url: living1_3, caption: 'Air-conditioned living and dining space with ambient lighting' }
    ]
  },
  {
    id: 'living2',
    title: 'Living room 2',
    count: 7,
    amenities: 'Ceiling fan · Hot tub',
    coverImage: living2_1,
    photos: [
      { url: living2_1, caption: 'Private outdoor lounge and jacuzzi patio with plush seating' },
      { url: living2_2, caption: 'Heated private jacuzzi with wood decking and hydromassage jets' },
      { url: living2_3, caption: 'Double-height patio architecture and airy ambiance' },
      { url: living2_4, caption: 'Outdoor seating with wall sconces and greenery' },
      { url: living2_5, caption: 'Full view of the open lounge and private spa deck' },
      { url: living2_6, caption: 'Evening ambiance on the patio jacuzzi' },
      { url: living2_7, caption: 'Spacious private terrace relaxation area' }
    ]
  },
  {
    id: 'kitchen',
    title: 'Full kitchen',
    count: 2,
    amenities: 'Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery',
    coverImage: kitchen1,
    photos: [
      { url: kitchen1, caption: 'Fully equipped modular kitchen with refrigerator and appliances' },
      { url: kitchen2, caption: 'Modern kitchen counter with induction cooktop and dining setup' }
    ]
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    count: 6,
    amenities: 'Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi',
    coverImage: bedroom1,
    photos: [
      { url: bedroom1, caption: 'Master bedroom with plush double bed and sunny window' },
      { url: bedroom2, caption: 'Bedroom with wardrobe, dressing mirror, and wood flooring' },
      { url: bedroom3, caption: 'Comfortable bed setup with ambient bedside lighting' },
      { url: bedroom4, caption: 'Spacious air-conditioned bedroom retreat' },
      { url: bedroom5, caption: 'Cozy bedroom interior with private entrance' },
      { url: bedroom6, caption: 'View of the bedroom with natural daylight' }
    ]
  },
  {
    id: 'bathroom',
    title: 'Full bathroom',
    count: 1,
    amenities: 'Hairdryer · Hot water · Shampoo · Shower gel',
    coverImage: bathroom1,
    photos: [
      { url: bathroom1, caption: 'Modern bathroom with walk-in shower and designer pebble mirror' }
    ]
  },
  {
    id: 'gym',
    title: 'Gym',
    count: 5,
    amenities: 'Air conditioning · Gym · Exercise equipment · Ceiling fan',
    coverImage: gym1,
    photos: [
      { url: gym1, caption: 'Resident fitness gym with treadmills and cardio equipment' },
      { url: gym2, caption: 'Gym strength training station and cable machine' },
      { url: gym3, caption: 'Air-conditioned workout facility with wooden flooring' },
      { url: gym4, caption: 'Free weights rack and fitness equipment' },
      { url: gym5, caption: 'Spacious gym area with yoga and stretching space' }
    ]
  },
  {
    id: 'exterior',
    title: 'Exterior',
    count: 6,
    amenities: 'Building exterior · Gated entrance · Peaceful surroundings',
    coverImage: exterior1,
    photos: [
      { url: exterior1, caption: 'Amor de Goa building architecture with Portuguese red-tiled roof' },
      { url: exterior2, caption: 'Building exterior view surrounded by tropical palm trees' },
      { url: exterior3, caption: 'Gated residential apartment complex in Candolim' },
      { url: exterior1, caption: 'Private balconies and sunny facade' },
      { url: exterior2, caption: 'Tropical landscaping and palm canopy' },
      { url: exterior3, caption: 'Peaceful gated community in Candolim' }
    ]
  },
  {
    id: 'pool',
    title: 'Pool',
    count: 3,
    amenities: 'Shared outdoor pool · Sun loungers',
    coverImage: pool1,
    photos: [
      { url: pool1, caption: 'Shared outdoor swimming pool with crystal blue water' },
      { url: pool2, caption: 'Pool area with courtyard and sun loungers' },
      { url: pool3, caption: 'Open-air swimming pool in the Amor de Goa courtyard' }
    ]
  },
  {
    id: 'additional',
    title: 'Additional photos',
    count: 10,
    amenities: 'Patio · Hallway · Views & Amenities',
    coverImage: living2_2,
    photos: [
      { url: living2_2, caption: 'Private covered jacuzzi deck with wooden paneling' },
      { url: bedroom1, caption: 'Master bedroom suite with soft pillows and linens' },
      { url: kitchen1, caption: 'Fully functional kitchen setup with modern appliances' },
      { url: pool1, caption: 'Sparkling courtyard swimming pool under sunny skies' },
      { url: gym1, caption: 'Fitness center cardio equipment' },
      { url: living1_1, caption: 'Living room lounge with comfortable amber sofa' },
      { url: bathroom1, caption: 'Modern bathroom fixtures with pebble shaped mirror' },
      { url: exterior1, caption: 'Property architecture and tranquil Goan setting' },
      { url: living2_4, caption: 'Warm evening lighting at the outdoor lounge' },
      { url: pool2, caption: 'Courtyard swimming pool and resident sun deck' }
    ]
  }
];

export const allTourPhotos = photoTourCategories.flatMap((cat) =>
  cat.photos.map((photo) => ({
    ...photo,
    categoryTitle: cat.title,
    categoryId: cat.id
  }))
);
