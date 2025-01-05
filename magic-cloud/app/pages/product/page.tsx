"use client"

import Image, { StaticImageData } from "next/image";
import { Radio, RadioGroup } from '@headlessui/react'
import { Suspense, useEffect, useState } from 'react';

import Link from 'next/link';
import { StarIcon } from '@heroicons/react/20/solid';
import logo from 'app/assets/logo.png';
import { useSearchParams } from 'next/navigation';

const product = {
    id: '0',
    name: 'Potion of Elemental Mastery',
    price: '250 🪙',
    href: '#',
    colors: [
        { name: 'Black', class: 'bg-black', selectedClass: 'ring-black' },
    ],
    breadcrumbs: [
        { id: 1, name: 'Elixirs', href: '#' },
        { id: 2, name: 'Rare Brews', href: '#' },
    ],
    images: [
        {
            src: "logo",
            alt: 'A glowing potion bottle swirling with fiery reds, icy blues, and earthy greens.',
        },
        {
            src: logo,
            alt: 'The potion displayed on an ancient alchemy table with magical runes glowing around it.',
        },
        {
            src: logo,
            alt: 'A close-up of the bottle’s intricate engravings and glowing stopper.',
        },
        {
            src: logo,
            alt: 'The potion glowing brightly in a dark room, illuminating nearby objects.',
        },
    ],
    elements: [
        { name: 'Fire', class: 'bg-red-500', selectedClass: 'ring-red-500' },
        { name: 'Water', class: 'bg-blue-500', selectedClass: 'ring-blue-500' },
        { name: 'Earth', class: 'bg-green-500', selectedClass: 'ring-green-500' },
    ],
    sizes: [
        { name: 'Small Vial (100ml)', inStock: true },
        { name: 'Medium Flask (250ml)', inStock: true },
        { name: 'Large Bottle (500ml)', inStock: false },
    ],
    description:
        'The Potion of Elemental Mastery grants the user control over the elements of fire, water, and earth for a limited time. Perfect for battle, crafting, or impressing fellow magicians at your next magical gathering.',
    highlights: [
        'Crafted under a full moon for maximum potency',
        'Infused with dragon scale dust for elemental balance',
        'Sealed with an enchanted stopper to preserve freshness',
        'Certified by the Guild of Alchemists',
    ],
    details:
        'Each potion is brewed using rare ingredients such as phoenix feathers, enchanted spring water, and elemental essences. The Potion of Elemental Mastery is perfect for experienced magic users seeking temporary control over the elements. Note: Side effects may include glowing hands and a sudden affinity for elemental magic.',
};
// const products = [
//     {
//         id: '1',
//         name: 'Earthen Flask of Vitality',
//         price: '48 🪙',
//         href: '#',
//         breadcrumbs: [
//             { id: 1, name: 'Alchemy', href: '#' },
//             { id: 2, name: 'Potions', href: '#' },
//         ],
//         images: [
//             {
//                 src: logo,
//                 alt: 'A tall, slender flask with a natural clay texture and cork stopper, glowing faintly with life magic.',
//             },
//         ],
//         colors: [
//             { name: 'Clay', class: 'bg-brown-500', selectedClass: 'ring-brown-500' },
//         ],
//         sizes: [
//             { name: 'One Size', inStock: true },
//         ],
//         description:
//             'This enchanted earthen flask restores vitality to its wielder when filled with any liquid.',
//         highlights: [
//             'Handcrafted by Earth Mages',
//             'Infused with natural clay magic',
//             'Cork stopper enchanted for preservation',
//         ],
//         details:
//             'The Earthen Flask of Vitality is made from high-quality magical clay. Perfect for adventurers seeking restorative power during long journeys.',
//     },
//     {
//         id: '2',
//         name: 'Nomad’s Endless Chalice',
//         price: '35 🪙',
//         href: '#',
//         breadcrumbs: [
//             { id: 1, name: 'Alchemy', href: '#' },
//             { id: 2, name: 'Artifacts', href: '#' },
//         ],
//         images: [
//             {
//                 src: logo,
//                 alt: 'An olive-green chalice that glows faintly with an icy mist, engraved with runes of preservation.',
//             },
//         ],
//         colors: [
//             { name: 'Olive Green', class: 'bg-green-500', selectedClass: 'ring-green-500' },
//         ],
//         sizes: [
//             { name: 'One Size', inStock: true },
//         ],
//         description:
//             'A magical chalice that keeps its contents at the perfect temperature, no matter the environment.',
//         highlights: [
//             'Insulated with Frost Runes',
//             'Durable enchantments for travel',
//             'Seal-tight lid for easy transport',
//         ],
//         details:
//             'The Nomad’s Endless Chalice is perfect for adventurers and explorers. It keeps potions fresh and enchanted drinks at peak potency.',
//     },
//     {
//         id: '3',
//         name: 'Scrolls of Focused Thought',
//         price: '89 🪙',
//         href: '#',
//         breadcrumbs: [
//             { id: 1, name: 'Magic', href: '#' },
//             { id: 2, name: 'Scrolls', href: '#' },
//         ],
//         images: [
//             {
//                 src: logo,
//                 alt: 'A set of enchanted scrolls glowing faintly as a mage writes upon them with golden ink.',
//             },
//         ],
//         colors: [
//             { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//         ],
//         sizes: [
//             { name: 'One Size', inStock: true },
//         ],
//         description:
//             'These scrolls are imbued with focus magic, enhancing productivity and clarity of thought.',
//         highlights: [
//             'Enchanted for concentration',
//             'Smooth, magical parchment',
//             'Perfect for spellcasting notes',
//         ],
//         details:
//             'Ideal for scholars and mages, the Scrolls of Focused Thought ensure precision and durability in all magical writings.',
//     },
//     {
//         id: '4',
//         name: 'Steel Quill of Precision',
//         price: '35 🪙',
//         href: '#',
//         breadcrumbs: [
//             { id: 1, name: 'Magic', href: '#' },
//             { id: 2, name: 'Tools', href: '#' },
//         ],
//         images: [
//             {
//                 src: logo,
//                 alt: 'A sleek black mechanical quill with golden accents, glowing faintly with arcane power.',
//             },
//         ],
//         colors: [
//             { name: 'Black', class: 'bg-black', selectedClass: 'ring-black' },
//         ],
//         sizes: [
//             { name: 'One Size', inStock: true },
//         ],
//         description:
//             'A precision-crafted mechanical quill enchanted for perfect strokes and durability.',
//         highlights: [
//             'Forged with enchanted steel',
//             'Durable and elegant design',
//             'Perfect for magical diagrams',
//         ],
//         details:
//             'The Steel Quill of Precision is a must-have for every mage. Its precision and balance make it the ideal tool for intricate spell work.',
//     },
//     {
//         id: '5',
//         name: 'Shimmering Tunic of Comfort',
//         price: '110 🪙',
//         href: '#',
//         breadcrumbs: [
//             { id: 1, name: 'Apparel', href: '#' },
//             { id: 2, name: 'Tunics', href: '#' },
//         ],
//         images: [
//             {
//                 src: logo,
//                 alt: 'A soft, shimmering white tunic that glows faintly under moonlight.',
//             },
//         ],
//         colors: [
//             { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//         ],
//         sizes: [
//             { name: 'S', inStock: true },
//             { name: 'M', inStock: true },
//             { name: 'L', inStock: true },
//             { name: 'XL', inStock: true },
//         ],
//         description:
//             'A magical tunic woven from enchanted threads, offering unparalleled comfort and durability.',
//         highlights: [
//             'Made from enchanted cotton',
//             'Soft and comfortable',
//             'Resistant to wear',
//         ],
//         details:
//             'This tunic is perfect for adventurers and travelers alike. Its enchanted fibers provide comfort in all conditions.',
//     },
//     {
//         id: '6',
//         name: 'Rose Essence Elixir',
//         price: '120 🪙',
//         href: '#',
//         breadcrumbs: [
//             { id: 1, name: 'Alchemy', href: '#' },
//             { id: 2, name: 'Elixirs', href: '#' },
//         ],
//         images: [
//             {
//                 src: 'https://example.com/images/rose-elixir.jpg',
//                 alt: 'A pink glowing potion bottle adorned with petals and golden seals.',
//             },
//         ],
//         colors: [
//             { name: 'Pink', class: 'bg-pink-500', selectedClass: 'ring-pink-500' },
//         ],
//         sizes: [
//             { name: 'One Size', inStock: true },
//         ],
//         description:
//             'A luxurious elixir infused with the essence of roses, granting charisma and allure.',
//         highlights: [
//             'Enhances charm',
//             'Long-lasting magical effects',
//             'Elegant bottle design',
//         ],
//         details:
//             'The Rose Essence Elixir is perfect for those seeking to captivate their audience. Its fragrance and charm effects are unparalleled.',
//     },
//     {
//         id: '7',
//         name: 'Musk of Enchanted Bloom',
//         price: '120 🪙',
//         href: '#',
//         breadcrumbs: [
//             { id: 1, name: 'Alchemy', href: '#' },
//             { id: 2, name: 'Elixirs', href: '#' },
//         ],
//         images: [
//             {
//                 src: 'https://example.com/images/musk-elixir.jpg',
//                 alt: 'A shimmering rose-gold potion vial glowing with magical energy.',
//             },
//         ],
//         colors: [
//             { name: 'Rose Gold', class: 'bg-rose-500', selectedClass: 'ring-rose-500' },
//         ],
//         sizes: [
//             { name: 'One Size', inStock: true },
//         ],
//         description:
//             'A fragrant elixir that enhances perception and unlocks the secrets of the natural world.',
//         highlights: [
//             'Grants heightened senses',
//             'Elegant, magical packaging',
//             'Perfect for explorers',
//         ],
//         details:
//             'This potion is a favorite of alchemists and nature-lovers alike, offering heightened awareness and lasting enchantment.',
//     },
//     {
//         id: '8',
//         name: 'Essence of Dusk',
//         price: '120 🪙',
//         href: '#',
//         breadcrumbs: [
//             { id: 1, name: 'Alchemy', href: '#' },
//             { id: 2, name: 'Elixirs', href: '#' },
//         ],
//         images: [
//             {
//                 src: 'https://example.com/images/dusk-essence.jpg',
//                 alt: 'A dark, mysterious potion with swirling shadows inside its container.',
//             },
//         ],
//         colors: [
//             { name: 'Dark', class: 'bg-black', selectedClass: 'ring-black' },
//         ],
//         sizes: [
//             { name: 'One Size', inStock: true },
//         ],
//         description:
//             'A bold elixir that grants the user a veil of shadows and increased stealth.',
//         highlights: [
//             'Perfect for stealth missions',
//             'Shadows swirl within',
//             'Elegant, dark design',
//         ],
//         details:
//             'The Essence of Dusk is prized by rogues and assassins, offering temporary mastery of the shadows.',
//     },
// ];


interface Breadcrumb {
    id: number;
    name: string;
    href: string;
}

interface Image {
    src: string | StaticImageData;
    alt: string;
}

interface Color {
    name: string;
    class: string;
    selectedClass: string;
}

interface Size {
    name: string;
    inStock: boolean;
}

interface Product {
    id: string;
    name: string;
    price: string;
    href: string;
    breadcrumbs: Breadcrumb[];
    images: Image[];
    colors: Color[];
    sizes: Size[];
    description: string;
    highlights: string[];
    details: string;
}

// type ProductDb = {
//     idProduct: string | number;
//     name: string;
//     price: string;
//     imageSrc: string;
//     imageAlt: string;
// };


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [, setSelectedId] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<Product>(product);
    const [success, setSuccess] = useState('');

    const fetchProduct = async (id : string) => {
        try {
            console.log('fetching products');
            const response = await fetch(`/api/products/${id}`); // Calls the proxy route
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            console.log(response);
            const data = await response.json();
            console.log(data); // Should log the list of products
            const productSelected = {
                    id : data.idProduct.toString(),
                    name: data.name,
                    price: data.price + ' 🪙',
                    href: '#',
                    breadcrumbs: [
                        { id: 1, name: 'Alchemy', href: '#' },
                        { id: 2, name: 'Potions', href: '#' },
                    ],
                    images: [
                        {
                            src: logo,
                            alt: data.imageAlt,
                        },
                        {
                            src: logo,
                            alt: 'The potion displayed on an ancient alchemy table with magical runes glowing around it.',
                        },
                        {
                            src: logo,
                            alt: 'A close-up of the bottle’s intricate engravings and glowing stopper.',
                        },
                        {
                            src: logo,
                            alt: 'The potion glowing brightly in a dark room, illuminating nearby objects.',
                        },
                    ],
                    colors: [
                        { name: 'Black', class: 'bg-black', selectedClass: 'ring-black' },
                    ],
                    sizes: [
                        { name: 'Small Vial (100ml)', inStock: true },
                        { name: 'Medium Flask (250ml)', inStock: true },
                        { name: 'Large Bottle (500ml)', inStock: false },
                    ],
                    description: data.imageAlt,
                    highlights: [
                        'Crafted under a full moon for maximum potency',
                        'Infused with dragon scale dust for elemental balance',
                        'Sealed with an enchanted stopper to preserve freshness',
                        'Certified by the Guild of Alchemists',
                    ],
                    details : 'Each potion is brewed using rare ingredients such as phoenix feathers, enchanted spring water, and elemental essences. The Potion of Elemental Mastery is perfect for experienced magic users seeking temporary control over the elements. \nNote: Side effects may include glowing hands and a sudden affinity for elemental magic.',
            };
            console.log(productSelected);
            setSelectedProduct(productSelected);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const SearchParamsHandler = () => {
        const searchParams = useSearchParams();

        useEffect(() => {
            console.log(localStorage.getItem('cart'));
            const id = searchParams.get('productId');
            console.log(id);
            setSelectedId(id || '');
            if(!id) return;
            fetchProduct(id);
        }, [searchParams]);

        return null; // Pas besoin de retourner un composant visuel ici
    };

    useEffect(() => {
        console.log(selectedProduct.breadcrumbs);
    }, [selectedProduct]);

    const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(localStorage.getItem('cart'));
        const quantity = 1;
        if (typeof window !== 'undefined') {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItemIndex = cart.findIndex((item: { productId: string; }) => item.productId === selectedProduct.id);

            if (existingItemIndex >= 0) {
                cart[existingItemIndex].quantity += quantity;
                cart[existingItemIndex].total = '$' + (parseInt(cart[existingItemIndex].price.replace('$', '')) * cart[existingItemIndex].quantity).toString();
            } else {
                const intPrice = parseInt(selectedProduct.price.replace('$', ''));
                const intTotal = quantity * intPrice;
                const total = '$' + intTotal.toString();
                cart.push({ productId: selectedProduct.id, quantity, price: selectedProduct.price, total, name: selectedProduct.name, image: selectedProduct.images[0].src });
            }
            setSuccess('Product added to cart');

            localStorage.setItem('cart', JSON.stringify(cart));
        }

        console.log(localStorage.getItem('cart'));

        // router.push('/shopping_cart');
    };

    

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchParamsHandler />
            <div className="bg-gradient-to-tr from-purple-400 via-indigo-500 to-indigo-400 px-40 py-20">
                <div className="bg-white pt-6 shadow-2xl shadow-white/50 rounded-2xl">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex justify-between max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div className='flex'>
                                <button className="mr-5" type="button">
                                    <Link href="./catalogue">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                                        </svg>
                                    </Link>
                                </button>
                                {selectedProduct.breadcrumbs.map((breadcrumb) => (
                                    <li key={breadcrumb.id}>
                                        <div className="flex items-center">
                                            <a href={breadcrumb.href} className="mr-2   font-medium text-gray-900">
                                                {breadcrumb.name}
                                            </a>
                                            <svg
                                                width={16}
                                                height={20}
                                                viewBox="0 0 16 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                className="h-5 w-4 text-gray-300"
                                            >
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>
                                ))}
                                <li className=" ">
                                    <a href={selectedProduct.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                        {selectedProduct.name}
                                    </a>
                                </li></div>
                            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 flex items-center gap-4 px-4 capitalize" type="button">
                                <Link href="./shopping_cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </Link>
                            </button>

                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 justify-items-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>


                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <Image
                                src={selectedProduct.images[0].src}
                                alt={selectedProduct.images[0].alt}

                            />
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{selectedProduct.name}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">{selectedProduct.price}</p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    reviews.average > rating ? 'text-yellow-500' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0',
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a href={reviews.href} className="ml-3   font-medium text-indigo-600 hover:text-indigo-500">
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Colors */}
                                <div>
                                    <h3 className="  font-medium text-gray-900">Color</h3>

                                    <fieldset aria-label="Choose a color" className="mt-4">
                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                                            {selectedProduct.colors.map((color) => (
                                                <Radio
                                                    key={color.name}
                                                    value={color}
                                                    aria-label={color.name}
                                                    className={({ focus, checked }) =>
                                                        classNames(
                                                            color.selectedClass,
                                                            focus && checked ? 'ring ring-offset-1' : '',
                                                            !focus && checked ? 'ring-2' : '',
                                                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                                                        )
                                                    }
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.class,
                                                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                                                        )}
                                                    />
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                </div>

                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="  font-medium text-gray-900">Size</h3>
                                        <a href="#" className="  font-medium text-indigo-600 hover:text-indigo-500">
                                            Size guide
                                        </a>
                                    </div>

                                    <fieldset aria-label="Choose a size" className="mt-4">
                                        <RadioGroup
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                            className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                        >
                                            {selectedProduct.sizes.map((size) => (
                                                <Radio
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={({ focus }) =>
                                                        classNames(
                                                            size.inStock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            focus ? 'ring-2 ring-indigo-500' : '',
                                                            'group relative flex items-center justify-center rounded-md border px-4 py-3   font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                                                        )
                                                    }
                                                >
                                                    {({ checked, focus }: { checked: boolean; focus: boolean }) => (
                                                        <>
                                                            <span>{size.name}</span>
                                                            {size.inStock ? (
                                                                <span
                                                                    className={classNames(
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        focus ? 'border' : 'border-2',
                                                                        'pointer-events-none absolute -inset-px rounded-md',
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                </div>
                                {success && <p className="text-green-500 mt-4">{success}</p>}
                                <button
                                    onClick={(e) => addToCart(e)}
                                    // type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-tr from-purple-400 via-indigo-500 to-indigo-400 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Add to cart
                                </button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{selectedProduct.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="  font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4  ">
                                        {selectedProduct.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="  font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="  text-gray-600">{selectedProduct.details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Suspense>
    )
}