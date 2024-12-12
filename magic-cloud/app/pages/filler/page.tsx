"use client";

import { useState } from 'react'
import {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import logo from 'app/assets/logo.png';
import Image from "next/image";
import Link from 'next/link';

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


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


const sendEventToKafka = async (event: string, data: unknown) => {
    try {
        await fetch('/api/kafka', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ event, data }),
        });
    } catch (error) {
        console.error('Failed to send event to Kafka:', error);
    }
};



export default function Example() {
    const [, setOpen] = useState(false)


    function navPage(idProduct: string | number) {
        sendEventToKafka('navPage', { pageId: idProduct });

    }


    return (
        <div className="bg-gradient-to-tr from-purple-400 via-indigo-500 to-indigo-400 min-h-[900px]">
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
                                                                                                <Link href="./standin" onClick={() => navPage(item.id)}>
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
                                                onClick={() => navPage(page.id)}
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
            <div className='flex justify-center items-center w-full h-full flex-col'>
                <p className='pt-52 text-center'>This page only exists for statistic gathering purposes. <br />To consult our list of products, please click on the button below</p>
                <Link href="./catalogue"><button
                    className="mt-10 tracking-wide font-semibold bg-gradient-to-tl from-indigo-500 to-purple-400 text-gray-100 w-25 py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit ml-5">
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                    </svg>
                    <span className="w-20 mr-3">
                        Home
                    </span>
                </button>
                </Link>
            </div>
        </div>
    )
}