import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CarImageDialog from '../components/CarImageDialog';
import { ChevronDown, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Enhanced car data with make, model, year, pricing, and additional images
const carsData = [
  // Existing cars from first photoshoot
  {
    id: 1,
    name: 'Toyota Rav4',
    make: 'Toyota',
    model: 'Rav4',
    year: 2024,
    category: 'SUV',
    price: 60,
    daily: 60,
    weekly: 380,
    monthly: 1350,
    image: 'STEV4545.jpg',
    description: 'Versatile, fuel-efficient compact SUV known for its reliability, comfort, and advanced safety features.',
    additionalImages: ['STEV4544.jpg', 'STEV4548.jpg', 'STEV4549.jpg', 'STEV4551.jpg', 'STEV4555.jpg']
  },
  {
    id: 2,
    name: 'Mercedes Benz CLA45 AMG',
    make: 'Mercedes Benz',
    model: 'CLA45 AMG',
    year: 2017,
    category: 'Luxury Sedan',
    price: 100,
    daily: 100,
    weekly: 600,
    monthly: 1600,
    image: 'STEV4591.jpg',
    description: 'High-performance compact coupe that blends aggressive styling with exhilarating power and precision handling.',
    additionalImages: ['STEV4570.jpg', 'STEV4588.jpg', 'STEV4582.jpg', 'STEV4593.jpg']
  },
  {
    id: 3,
    name: 'Mercedes Benz E43 AMG',
    make: 'Mercedes Benz',
    model: 'E43 AMG',
    year: 2017,
    category: 'Luxury Sedan',
    price: 140,
    daily: 140,
    weekly: 750,
    monthly: 2700,
    image: 'STEV4627.jpg',
    description: 'Sleek, high-performance compact sedan boasting turbocharged power, sharp handling, and AMG-tuned luxury.',
    additionalImages: ['STEV4633.jpg', 'STEV4639.jpg', 'STEV4649.jpg']
  },
  {
    id: 4,
    name: 'Nissan Qashqai',
    make: 'Nissan',
    model: 'Qashqai',
    year: 2023,
    category: 'SUV',
    price: 120,
    daily: 120,
    weekly: 750,
    monthly: 2800,
    image: 'STEV4657.jpg',
    description: 'Stylish and practical compact SUV offering a comfortable ride, modern tech, and strong fuel efficiency.',
    additionalImages: ['STEV4669.jpg', 'STEV4679.jpg', 'STEV4659.jpg']
  },
  {
    id: 5,
    name: 'Hyundai Palisade',
    make: 'Hyundai',
    model: 'Palisade',
    year: 2024,
    category: '7-Seater',
    price: 85,
    daily: 85,
    weekly: 550,
    monthly: 2100,
    image: 'STEV4685.jpg',
    description: 'Sleek and spacious midsize sedan that combines modern design, advanced tech, and excellent value.',
    additionalImages: ['STEV4693.jpg', 'STEV4696.jpg', 'STEV4691.jpg', 'STEV4690.jpg']
  },

  // Additional cars from second photoshoot
  {
    id: 6,
    name: 'Toyota Camry',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    category: 'Sedan',
    price: 150,
    daily: 150,
    weekly: 950,
    monthly: 3500,
    image: 'STEV3802.jpg',
    description: 'Reliable and comfortable midsize sedan with excellent fuel economy and advanced safety features.',
    additionalImages: ['STEV3803.jpg', 'STEV3804.jpg', 'STEV3805.jpg', 'STEV3806.jpg', 'STEV3807.jpg', 'STEV3809.jpg', 'STEV3810.jpg', 'STEV3811.jpg', 'STEV3813.jpg', 'STEV3814.jpg', 'STEV3815.jpg', 'STEV3816.jpg', 'STEV3818.jpg', 'STEV3820.jpg']
  },
  {
    id: 7,
    name: 'Volkswagen Jetta Grey',
    make: 'Volkswagen',
    model: 'Jetta',
    year: 2021,
    category: 'Sedan',
    price: 65,
    daily: 65,
    weekly: 400,
    monthly: 1600,
    image: 'STEV3845.jpg',
    description: 'Compact sedan offering German engineering with fuel efficiency and modern technology.',
    additionalImages: ['STEV3848.jpg', 'STEV3849.jpg', 'STEV3850.jpg', 'STEV3852.jpg', 'STEV3853.jpg', 'STEV3857.jpg', 'STEV3861.jpg', 'STEV3864.jpg']
  },
  {
    id: 8,
    name: 'Kia',
    make: 'Kia',
    model: 'Various',
    year: 2024,
    category: 'Sedan',
    price: 75,
    daily: 75,
    weekly: 475,
    monthly: 1700,
    image: 'STEV3951.jpg',
    description: 'Modern vehicle with excellent value, reliability, and comprehensive warranty coverage.',
    additionalImages: ['STEV3957.jpg', 'STEV3975.jpg', 'STEV3982.jpg', 'STEV3994.jpg', 'STEV3998.jpg', 'STEV4001.jpg', 'STEV4008.jpg', 'STEV4018.jpg', 'STEV4026-2.jpg', 'STEV4026.jpg', 'STEV4027.jpg']
  },
  {
    id: 9,
    name: 'Porsche Carrera S 992',
    make: 'Porsche',
    model: 'Carrera S 992',
    year: 2018,
    category: 'Luxury Sports',
    price: 150,
    daily: 150,
    weekly: 900,
    monthly: 3200,
    image: 'STEV4028-2.jpg',
    description: 'Ultimate driving machine with precision engineering, breathtaking performance, and iconic design.',
    additionalImages: ['STEV4028.jpg', 'STEV4037.jpg', 'STEV4039 (1).jpg', 'STEV4040 (1).jpg', 'STEV4042.jpg', 'STEV4045 (1).jpg', 'STEV4046.jpg', 'STEV4047 (1).jpg', 'STEV4049 (1).jpg', 'STEV4050 (1).jpg', 'STEV4052 (1).jpg', 'STEV4053 (1).jpg', 'STEV4054 (1).jpg', 'STEV4055 (1).jpg', 'STEV4056 (1).jpg', 'STEV4057.jpg', 'STEV4060 (1).jpg', 'STEV4060-2.jpg']
  },
  {
    id: 10,
    name: 'Range Rover Evoque',
    make: 'Range Rover',
    model: 'Evoque',
    year: 2020,
    category: 'Luxury SUV',
    price: 100,
    daily: 100,
    weekly: 600,
    monthly: 2000,
    image: 'STEV3869.jpg',
    description: 'Luxury compact SUV combining sophisticated design with off-road capability and premium comfort.',
    additionalImages: ['STEV3871.jpg', 'STEV3873.jpg', 'STEV3875.jpg', 'STEV3879.jpg', 'STEV3880.jpg', 'STEV3882.jpg', 'STEV3888.jpg', 'STEV3892.jpg', 'STEV3893.jpg', 'STEV3896.jpg']
  },
  {
    id: 11,
    name: 'Volkswagen Jetta Red',
    make: 'Volkswagen',
    model: 'Jetta',
    year: 2021,
    category: 'Sedan',
    price: 65,
    daily: 65,
    weekly: 400,
    monthly: 1600,
    image: 'STEV3822.jpg',
    description: 'Compact sedan offering German engineering with fuel efficiency and modern technology.',
    additionalImages: ['STEV3823.jpg', 'STEV3824.jpg', 'STEV3825.jpg', 'STEV3826.jpg', 'STEV3827.jpg', 'STEV3828.jpg', 'STEV3829.jpg', 'STEV3831.jpg', 'STEV3834.jpg', 'STEV3835.jpg', 'STEV3836.jpg', 'STEV3837.jpg', 'STEV3840.jpg', 'STEV3841.jpg', 'STEV3843.jpg']
  },
  {
    id: 12,
    name: 'Tesla Model Y',
    make: 'Tesla',
    model: 'Model Y',
    year: 2024,
    category: 'Electric',
    price: 95,
    daily: 95,
    weekly: 600,
    monthly: 1900,
    image: 'STEV3909.jpg',
    description: 'Electric SUV with cutting-edge technology, impressive range, and exhilarating performance.',
    additionalImages: ['STEV3912.jpg', 'STEV3914.jpg', 'STEV3919.jpg', 'STEV3923.jpg', 'STEV3926.jpg', 'STEV3931.jpg', 'STEV3932.jpg', 'STEV3933.jpg', 'STEV3934.jpg', 'STEV3935.jpg', 'STEV3937.jpg', 'STEV3940.jpg', 'STEV3944.jpg']
  },
  {
    id: 13,
    name: 'Dodge Challenger',
    make: 'Dodge',
    model: 'Challenger',
    year: 2024,
    category: 'Muscle Car',
    price: 110,
    daily: 110,
    weekly: 700,
    monthly: 2300,
    image: 'STEV3923.jpg',
    description: 'Iconic American muscle car with powerful performance and aggressive styling.',
    additionalImages: ['STEV3926.jpg', 'STEV3931.jpg', 'STEV3932.jpg', 'STEV3933.jpg', 'STEV3934.jpg', 'STEV3935.jpg', 'STEV3937.jpg', 'STEV3940.jpg', 'STEV3944.jpg']
  }
];
const Cars = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceSort, setPriceSort] = useState('');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedModel, setSelectedModel] = useState('All');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  // Dialog state
  const [selectedCar, setSelectedCar] = useState<null | typeof carsData[0]>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Extract unique makes and models
  const categories = ['All', 'Sports', 'Sedan', 'SUV', 'Luxury Sedan', 'Luxury SUV', 'Luxury Sports', '7-Seater', 'Electric', 'Muscle Car'];
  const makes = ['All', ...Array.from(new Set(carsData.map(car => car.make)))];
  const models = ['All', ...Array.from(new Set(carsData.map(car => car.model)))];
  const years = Array.from(new Set(carsData.map(car => car.year))).sort();

  // Create a mapping of models to their makes
  const modelToMakeMap = carsData.reduce((map, car) => {
    map[car.model] = car.make;
    return map;
  }, {});

  // Handle model selection with make validation
  const handleModelChange = model => {
    setSelectedModel(model);

    // If a specific model is selected (not "All") and it doesn't match the current make
    if (model !== 'All') {
      const makeForModel = modelToMakeMap[model];
      // If current selected make doesn't match this model's make, update the make
      if (selectedMake !== makeForModel) {
        setSelectedMake(makeForModel);
      }
    }
  };

  // Get models filtered by selected make
  const getFilteredModels = () => {
    if (selectedMake === 'All') {
      return ['All', ...Array.from(new Set(carsData.map(car => car.model)))];
    } else {
      return ['All', ...Array.from(new Set(carsData.filter(car => car.make === selectedMake).map(car => car.model)))];
    }
  };

  // Open dialog with selected car
  const openCarDialog = car => {
    setSelectedCar(car);
    setIsDialogOpen(true);
  };

  // Close dialog
  const closeCarDialog = () => {
    setIsDialogOpen(false);
    setSelectedCar(null);
  };

  // Filter cars based on all criteria
  const filteredCars = carsData.filter(car => {
    // Apply category filter
    if (selectedCategory !== 'All' && car.category !== selectedCategory) return false;

    // Apply make filter
    if (selectedMake !== 'All' && car.make !== selectedMake) return false;

    // Apply model filter
    if (selectedModel !== 'All' && car.model !== selectedModel) return false;

    // Apply year range filter
    if (minYear && car.year < parseInt(minYear)) return false;
    if (maxYear && car.year > parseInt(maxYear)) return false;

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return car.name.toLowerCase().includes(query) || car.make.toLowerCase().includes(query) || car.model.toLowerCase().includes(query) || car.description.toLowerCase().includes(query);
    }
    return true;
  }).sort((a, b) => {
    if (priceSort === 'asc') return a.price - b.price;
    if (priceSort === 'desc') return b.price - a.price;
    return 0;
  });

  // Get the filtered models list whenever selectedMake changes
  const filteredModels = getFilteredModels();
  return <Layout>
    {/* Hero Section */}
    <section className="relative h-[40vh] bg-luxury-black flex items-center">
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{
        backgroundImage: "url('STEV4682.jpg')"
      }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Our <span className="text-luxury-gold">Exclusive</span> Fleet
          </h1>
          <p className="text-xl text-white">Choose from our selection of the top-quality vehicles</p>
        </div>
      </div>
    </section>

    {/* Search Section */}
    <section className="py-6 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input type="text" className="block w-full p-4 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold" placeholder="Search by make, model, or keywords..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
      </div>
    </section>

    {/* Filters Section */}
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between items-center">
          {/* Mobile Filter Toggle */}
          <button className="w-full md:hidden flex items-center justify-between p-4 mb-4 border rounded-lg" onClick={() => setFilterMenuOpen(!filterMenuOpen)}>
            <span>Filters</span>
            <ChevronDown className={`transition-transform ${filterMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Filters */}
          <div className={`md:flex space-y-4 md:space-y-0 md:space-x-4 ${filterMenuOpen ? 'block' : 'hidden md:flex'}`}>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-luxury-gray mb-1">Category</label>
              <select id="category" className="p-2 border border-gray-300 rounded-md w-full md:w-auto" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="make" className="block text-sm font-medium text-luxury-gray mb-1">Make</label>
              <select id="make" className="p-2 border border-gray-300 rounded-md w-full md:w-auto" value={selectedMake} onChange={e => {
                setSelectedMake(e.target.value);
                setSelectedModel('All'); // Reset model when make changes
              }}>
                {makes.map(make => <option key={make} value={make}>{make}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-luxury-gray mb-1">Model</label>
              <select id="model" className="p-2 border border-gray-300 rounded-md w-full md:w-auto" value={selectedModel} onChange={e => handleModelChange(e.target.value)}>
                {filteredModels.map(model => <option key={model} value={model}>{model}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="minYear" className="block text-sm font-medium text-luxury-gray mb-1">Min Year</label>
              <select id="minYear" className="p-2 border border-gray-300 rounded-md w-full md:w-auto" value={minYear} onChange={e => setMinYear(e.target.value)}>
                <option value="">Any</option>
                {years.map(year => <option key={`min-${year}`} value={year}>{year}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="maxYear" className="block text-sm font-medium text-luxury-gray mb-1">Max Year</label>
              <select id="maxYear" className="p-2 border border-gray-300 rounded-md w-full md:w-auto" value={maxYear} onChange={e => setMaxYear(e.target.value)}>
                <option value="">Any</option>
                {years.map(year => <option key={`max-${year}`} value={year}>{year}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-luxury-gray mb-1">Price</label>
              <select id="price" className="p-2 border border-gray-300 rounded-md w-full md:w-auto" value={priceSort} onChange={e => setPriceSort(e.target.value)}>
                <option value="">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>

          <div className={`mt-4 md:mt-0 ${filterMenuOpen ? 'block' : 'hidden md:block'}`}>
            <button className="text-luxury-gray underline" onClick={() => {
              setSelectedCategory('All');
              setSelectedMake('All');
              setSelectedModel('All');
              setMinYear('');
              setMaxYear('');
              setPriceSort('');
              setSearchQuery('');
            }}>
              Clear filters
            </button>
            <p className="text-luxury-gray">{filteredCars.length} vehicles available</p>
          </div>
        </div>
      </div>
    </section>

    {/* Cars Catalog */}
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {filteredCars.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 animate-slide-up cursor-pointer" onClick={() => openCarDialog(car)}>
            <div className="h-64 overflow-hidden">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-3">
                <span className="inline-block px-3 py-1 bg-gray-100 text-luxury-gray text-sm rounded-full">
                  {car.category}
                </span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-luxury-gray text-sm rounded-full">
                  {car.year}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">{car.name}</h3>
              <p className="text-luxury-gray mb-4">{car.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-luxury-gold">${car.daily}/day</span>
                <Link to="/contact" className="gold-button" onClick={e => {
                  e.stopPropagation(); // Prevent opening the dialog when clicking the button
                }}>
                  Book Now
                </Link>
              </div>
            </div>
          </div>)}
        </div> : <div className="text-center py-12">
          <h3 className="text-2xl font-bold mb-4">No vehicles found</h3>
          <p className="text-luxury-gray mb-6">We couldn't find any vehicles matching your criteria.</p>
          <button className="gold-button" onClick={() => {
            setSelectedCategory('All');
            setSelectedMake('All');
            setSelectedModel('All');
            setMinYear('');
            setMaxYear('');
            setPriceSort('');
            setSearchQuery('');
          }}>
            Reset Filters
          </button>
        </div>}
      </div>
    </section>

    {/* Car Image Dialog */}
    {selectedCar && <CarImageDialog isOpen={isDialogOpen} onClose={closeCarDialog} car={selectedCar} additionalImages={selectedCar.additionalImages || []} />}
  </Layout>;
};
export default Cars;
