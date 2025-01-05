"use client"

import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react';

import Image from "next/image";
import Link from 'next/link';
import logo from 'app/assets/logo.png';
import { useRouter } from 'next/navigation';

const navigation = {
    categories: [
        {
            id: 'elixirs',
            name: 'Elixirs',
            featured: [
                {
                    id: 'elixirs-featured-1',
                    name: 'New Brews',
                    href: '#',
                    imageSrc: logo,
                    imageAlt: 'Glowing elixir bottles arranged on an enchanted shelf.',
                },
                {
                    id: 'elixirs-featured-2',
                    name: 'Healing Potions',
                    href: '#',
                    imageSrc: logo,
                    imageAlt: 'Crystal-clear bottles of healing potions glowing with green light.',
                },
            ],
            sections: [
                {
                    id: 'elixirs-health',
                    name: 'Health & Vitality',
                    items: [
                        { id: 'elixirs-healing', name: 'Healing', href: '#' },
                        { id: 'elixirs-stamina', name: 'Stamina Boosts', href: '#' },
                        { id: 'elixirs-rejuvenation', name: 'Rejuvenation', href: '#' },
                        { id: 'elixirs-antidotes', name: 'Antidotes', href: '#' },
                        { id: 'elixirs-browse-all', name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'elixirs-power',
                    name: 'Power & Enhancement',
                    items: [
                        { id: 'elixirs-strength', name: 'Strength Potions', href: '#' },
                        { id: 'elixirs-speed', name: 'Speed Elixirs', href: '#' },
                        { id: 'elixirs-magic', name: 'Magic Enhancers', href: '#' },
                        { id: 'elixirs-invisibility', name: 'Invisibility Draughts', href: '#' },
                        { id: 'elixirs-browse-all', name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'elixirs-rare',
                    name: 'Rare Brews',
                    items: [
                        { id: 'elixirs-phoenix-tears', name: 'Phoenix Tears', href: '#' },
                        { id: 'elixirs-dragon-blood', name: 'Dragon Blood Elixir', href: '#' },
                        { id: 'elixirs-moonlight', name: 'Moonlight Essence', href: '#' },
                        { id: 'elixirs-ancient-potions', name: 'Ancient Brews', href: '#' },
                    ],
                },
            ],
        },
        {
            id: 'ingredients',
            name: 'Ingredients',
            featured: [
                {
                    id: 'ingredients-featured-1',
                    name: 'Rare Finds',
                    href: '#',
                    imageSrc: logo,
                    imageAlt: 'A collection of rare magical ingredients in jars and vials.',
                },
                {
                    id: 'ingredients-featured-2',
                    name: 'Herbs & Roots',
                    href: '#',
                    imageSrc: logo,
                    imageAlt: 'Bundles of herbs and roots tied with twine.',
                },
            ],
            sections: [
                {
                    id: 'ingredients-herbs',
                    name: 'Herbs & Plants',
                    items: [
                        { id: 'ingredients-mandrake', name: 'Mandrake Root', href: '#' },
                        { id: 'ingredients-nightshade', name: 'Nightshade', href: '#' },
                        { id: 'ingredients-wolfsbane', name: 'Wolfsbane', href: '#' },
                        { id: 'ingredients-moonflower', name: 'Moonflower Petals', href: '#' },
                        { id: 'ingredients-browse-all', name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'ingredients-magical',
                    name: 'Magical Components',
                    items: [
                        { id: 'ingredients-unicorn-hair', name: 'Unicorn Hair', href: '#' },
                        { id: 'ingredients-dragon-scale', name: 'Dragon Scale Powder', href: '#' },
                        { id: 'ingredients-phoenix-feather', name: 'Phoenix Feather Ash', href: '#' },
                        { id: 'ingredients-crystal-shards', name: 'Enchanted Crystal Shards', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { id: 'about-us', name: 'About Us', href: '#' },
        { id: 'find-us', name: 'Find Us', href: '#' },
    ],
};

// const products = [
//     {
//         id: 1,
//         name: 'Elixir of Life',
//         href: '#',
//         price: '50 🪙',
//         imageSrc: logo,
//         imageAlt: 'A glowing golden potion with intricate carvings on the bottle.',
//     },
//     {
//         id: 2,
//         name: 'Potion of Swiftness',
//         href: '#',
//         price: '30 🪙',
//         imageSrc: logo,
//         imageAlt: 'A shimmering blue potion swirling with light.',
//     },
//     {
//         id: 3,
//         name: 'Dragon’s Breath Elixir',
//         href: '#',
//         price: '120 🪙',
//         imageSrc: logo,
//         imageAlt: 'A fiery red potion with smoke rising from the cork.',
//     },
//     {
//         id: 4,
//         name: 'Invisibility Draught',
//         href: '#',
//         price: '90 🪙',
//         imageSrc: logo,
//         imageAlt: 'A translucent potion with a faint silver glow.',
//     },
//     {
//         id: 5,
//         name: 'Phoenix Tears',
//         href: '#',
//         price: '150 🪙',
//         imageSrc: logo,
//         imageAlt: 'A radiant bottle with golden liquid and a phoenix feather inside.',
//     },
// ];

type ProductDb = {
    idProduct: string | number;
    name: string;
    price: string;
    imageSrc: string;
    imageAlt: string;
};

type Product = ProductDb & {
    href: string;
};

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Rarest Finds', href: '#', current: false },
    { name: 'Newest Brews', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
];

const subCategories = [
    { name: 'Health Potions', href: '#' },
    { name: 'Mana Elixirs', href: '#' },
    { name: 'Enchanted Items', href: '#' },
    { name: 'Rare Ingredients', href: '#' },
    { name: 'Spell Kits', href: '#' },
];

const filters = [
    {
        id: 'effect',
        name: 'Effect',
        options: [
            { value: 'healing', label: 'Healing', checked: false },
            { value: 'strength', label: 'Strength', checked: false },
            { value: 'invisibility', label: 'Invisibility', checked: true },
            { value: 'speed', label: 'Speed', checked: false },
            { value: 'mana', label: 'Mana', checked: false },
        ],
    },
    {
        id: 'rarity',
        name: 'Rarity',
        options: [
            { value: 'common', label: 'Common', checked: false },
            { value: 'rare', label: 'Rare', checked: true },
            { value: 'legendary', label: 'Legendary', checked: false },
        ],
    },
    {
        id: 'container',
        name: 'Container',
        options: [
            { value: 'vial', label: 'Vial', checked: false },
            { value: 'bottle', label: 'Bottle', checked: false },
            { value: 'flask', label: 'Flask', checked: true },
            { value: 'phial', label: 'Phial', checked: false },
        ],
    },
];


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function Example() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [openPop, setOpen] = useState(false)
    const [products, setProducts] = useState<Product[]>([]);

    const router = useRouter();

    const openProduct = (idProduct: string | number) => {
        router.push('/pages/product?productId=' + idProduct);

    }


    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         localStorage.removeItem('cart');
    //     }
    // }, [])
    



    const fetchProducts = async () => {
        try {
            console.log('fetching products');
            const response = await fetch('/api/products'); // Calls the proxy route
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            console.log(response);
            const data = await response.json();
            console.log(data); // Should log the list of products
            const dataProducts = data.map((p : ProductDb) => ({
                ...p,
                price: p.price + ' 🪙',
                imageSrc: logo,
                href: `pages/product?productId=${p.idProduct}`,
            }));
            setProducts(dataProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <div className="bg-gradient-to-tr from-purple-400 via-indigo-500 to-indigo-400">
            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-12 lg:py-10">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <a href="#">
                                    <span className="sr-only"></span>
                                    <Image
                                        src={logo}
                                        className="rounded-2xl shadow-lg shadow-white/50"
                                        width={200}
                                        alt=""
                                    />
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup>
                                <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        {navigation.categories.map((category) => (
                                            <Popover key={category.name} className="flex">
                                                {(props) => (
                                                    <>
                                                        <div className="relative flex">
                                                            <PopoverButton
                                                                className={classNames(
                                                                    props.open 
                                                                        ? 'text-indigo-600'
                                                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                    'relative z-10 -mb-px flex items-center pt-px font-medium transition-colors duration-200 ease-out',
                                                                )}
                                                            >
                                                                {category.name}
                                                            </PopoverButton>
                                                        </div>

                                                        <PopoverPanel
                                                            transition
                                                            className="absolute inset-x-0 top-full text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                                        >
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <Link href="./filler">
                                                                                                    <div className="hover:text-gray-800">
                                                                                                        {item.name}
                                                                                                    </div></Link>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </PopoverPanel>
                                                    </>
                                                )}
                                            </Popover>
                                        ))}

                                        {navigation.pages.map((page) => (
                                            <a
                                                key={page.name}
                                                href={page.href}
                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                {page.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </PopoverGroup>

                            <div className="ml-auto flex items-center">
                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <div className="group -m-2 flex items-center p-2">
                                        <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 flex items-center gap-4 px-4 capitalize" type="button">
                                            <Link href="./shopping_cart">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                </svg>
                                            </Link>
                                        </button>
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div>
                {/* Mobile filter dialog */}
                <Dialog className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href} className="block px-2 py-3">
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} >
                                        {({ open }) => (
                                            <div className="border-t border-gray-200 px-4 py-6">
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <DisclosurePanel className="pt-6">
                                                    <div className="space-y-6">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </DisclosurePanel>
                                            </div>
                                        )}
                                        
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-white">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as={Fragment} >
                                <div className="relative inline-block text-left">
                                    <div>
                                        <MenuButton className="text-white group inline-flex justify-center font-medium text-gray-700 hover:text-indigo-200">
                                            Sort
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <MenuItem key={option.name}>
                                                    {(props) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                props.focus ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm',
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </div>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 font-medium text-white">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href}>{category.name}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure key={section.id}>
                                        
                                            {({ open = { openPop } }) => (
                                                <div className="border-b border-gray-200 py-6">
                                                    <h3 className="-my-3 flow-root">
                                                        <DisclosureButton className="flex w-full items-center justify-between bg-white/10 rounded-lg py-3 text-sm text-white hover:text-gray-500 p-6">
                                                            <span className="font-medium text-white">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className="pt-6">
                                                        <div className="space-y-4">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-white"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </DisclosurePanel>
                                                </div>
                                            )}
                                        
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3"><div className="bg-white rounded-2xl shadow-2xl shadow-white/50">
                                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                    <h2 className="sr-only">Products</h2>

                                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                        {products.map((product) => (
                                            <a onClick={() => openProduct(product.idProduct)} key={product.idProduct} href={product.href} className="group">
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                    <Image
                                                        src={product.imageSrc}
                                                        alt={product.imageAlt}
                                                        width={500}
                                                        height={500}
                                                        className="h-[186px] w-full object-cover object-center group-hover:opacity-75"
                                                    />
                                                </div>
                                                <h3 className="mt-4 text-lg font-medium  text-gray-700">{product.name}</h3>
                                                <p className="mt-1 text-sm text-indigo-900">{product.price}</p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div></div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
