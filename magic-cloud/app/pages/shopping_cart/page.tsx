"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem {
    productId: string;
    quantity: number;
    price: string;
    total: string;
    image: string;
    name: string;
}

interface ShoppingCart {
    products: CartItem[];
}

// const defaultCart: ShoppingCart = {
//   products: [],
// };

const sendEventToKafka = async (event: string, data: unknown) => {
    try {
        await fetch("/api/kafka", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ event, data }),
        });
    } catch (error) {
        console.error("Failed to send event to Kafka:", error);
    }
};

export default function Shopping() {
    const [shoppingCart, setShoppingCart] = useState<ShoppingCart>();
    const [stringItems, setStringItems] = useState("");
    const [stringTotal, setStringTotal] = useState("");
    const [stringTotalWithDelivery, setStringTotalWithDelivery] = useState("");
    const [products, setProducts] = useState<CartItem[]>([]);

    const router = useRouter();

    const convertCartItems = (items: { productId: string; quantity: number; price: string; name: string; imageSrc: string }[]): CartItem[] => {
        return items.map((item) => ({
            productId: item.productId.toString(),
            quantity: item.quantity,
            price: item.price,
            total: `$${(
                parseFloat(item.price.replace("$", "")) * item.quantity
            ).toFixed(2)}`,
            name: item.name,
            image: item.imageSrc,
        }));
    };

    useEffect(() => {
        console.log("useEffect");
        const productsToLoad = localStorage.getItem("cart");
        console.log(localStorage.getItem("cart"));
        console.log(productsToLoad);
        if (productsToLoad) {
            try {
                console.log("parsing JSON from localStorage");
                const parsedProducts = JSON.parse(productsToLoad);
                console.log(parsedProducts);
                setProducts(parsedProducts);
                console.log(convertCartItems(parsedProducts));
                const cart: ShoppingCart = {
                    products: convertCartItems(parsedProducts),
                };
                console.log(cart);
                setShoppingCart(cart);

                const nbItems = cart.products.length || 0;
                if (nbItems === 1) {
                    setStringItems("1 Item");
                } else {
                    setStringItems(nbItems + " Items");
                }

                const total = cart.products.reduce(
                    (acc, item) => acc + parseFloat(item.total.replace("$", "")),
                    0
                );
                setStringTotal("$" + total.toFixed(2));
                setStringTotalWithDelivery("$" + (total + 5).toFixed(2));
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
            }
        }
    }, []);

    useEffect(() => {
        console.log("shoppingCart :");
        console.log(shoppingCart?.products);
    }, [shoppingCart]);

    const addProduct = (productId: string) => {
        console.log("addProduct");
        if (typeof window !== "undefined") {
            const existingItemIndex = products.findIndex(
                (item) => item.productId === productId
            );
            console.log(existingItemIndex);
            const productsEdit = products;

            if (existingItemIndex >= 0) {
                productsEdit[existingItemIndex].quantity += 1;
                productsEdit[existingItemIndex].total =
                    "$" +
                    (
                        parseInt(productsEdit[existingItemIndex].price.replace("$", "")) *
                        productsEdit[existingItemIndex].quantity
                    ).toString();
            }

            setProducts(productsEdit);
            sendEventToKafka("addProduct", {
                productId,
                quantity: productsEdit[existingItemIndex].quantity,
            });
            localStorage.setItem("cart", JSON.stringify(productsEdit));
        }

        console.log(products);
        window.location.reload();
    };

    const removeProduct = (productId: string) => {
        console.log("removeProduct");
        if (typeof window !== "undefined") {
            const existingItemIndex = products.findIndex(
                (item) => item.productId === productId
            );
            let productsEdit = products;

            if (existingItemIndex >= 0) {
                if (productsEdit[existingItemIndex].quantity === 1) {
                    productsEdit = productsEdit.filter(
                        (item) => item.productId !== productId
                    );
                } else {
                    productsEdit[existingItemIndex].quantity -= 1;
                    productsEdit[existingItemIndex].total =
                        "$" +
                        (
                            parseInt(productsEdit[existingItemIndex].price.replace("$", "")) *
                            productsEdit[existingItemIndex].quantity
                        ).toString();
                }
            }

            setProducts(productsEdit);
            localStorage.setItem("cart", JSON.stringify(productsEdit));
            sendEventToKafka("removeProduct", {
                productId,
                quantity: productsEdit[existingItemIndex]?.quantity || 0,
            });
            window.location.reload();
        }
    };

    const checkout = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (typeof window !== "undefined") {
            sendEventToKafka("checkout", { products });
            localStorage.removeItem("cart");
        }
        router.push("/catalogue");
    };

    return (
        <div className="bg-gradient-to-tr from-purple-400 via-indigo-500 to-indigo-400 px-40 py-20">
            <div className="bg-white py-6 shadow-2xl shadow-white/50 rounded-2xl pl-20 pr-10">
                <button className="mt-5" type="button">
                    <Link href="./catalogue">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="w-5 h-5 text-inherit text-grey-600"
                        >
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                        </svg>
                    </Link>
                </button>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-10 pb-8 lg:py-10 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                                Shopping Cart
                            </h2>
                            <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                                {stringItems}
                            </h2>
                        </div>
                        <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                            <div className="col-span-12 md:col-span-7">
                                <p className="font-normal text-lg leading-8 text-gray-400">
                                    Product Details
                                </p>
                            </div>
                            <div className="col-span-12 md:col-span-5">
                                <div className="grid grid-cols-5">
                                    <div className="col-span-3">
                                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                                            Quantity
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                                            Total
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {products.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group"
                                >
                                    <Image src={item.image} alt={item.name} className="mx-auto" width={126} height={126} />
                                    {/* <img src={item.image} alt={item.name} className="mx-auto" /> */}
                                    {/* </div> */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                        <div className="md:col-span-2">
                                            <div className="flex flex-col max-[500px]:items-center gap-3">
                                                <h6 className="font-semibold text-base leading-7 text-black">
                                                    {item.name}
                                                </h6>
                                                <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                                                    {item.price}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                            <div className="flex items-center h-full">
                                                <button
                                                    className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                                                    onClick={() => removeProduct(item.productId)}
                                                >
                                                    <svg
                                                        className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M16.5 11H5.5"
                                                            stroke=""
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                        />
                                                        <path
                                                            d="M16.5 11H5.5"
                                                            stroke=""
                                                            strokeOpacity="0.2"
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                        />
                                                        <path
                                                            d="M16.5 11H5.5"
                                                            stroke=""
                                                            strokeOpacity="0.2"
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                </button>
                                                <input
                                                    type="text"
                                                    className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                                                    onClick={() => addProduct(item.productId)}
                                                >
                                                    <svg
                                                        className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M11 5.5V16.5M16.5 11H5.5"
                                                            stroke=""
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                        />
                                                        <path
                                                            d="M11 5.5V16.5M16.5 11H5.5"
                                                            stroke=""
                                                            strokeOpacity="0.2"
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                        />
                                                        <path
                                                            d="M11 5.5V16.5M16.5 11H5.5"
                                                            stroke=""
                                                            strokeOpacity="0.2"
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                            <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                                                {item.total}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-10 px-10 rounded-lg">
                        <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                            Order Summary
                        </h2>
                        <div className="mt-8">
                            <div className="flex items-center justify-between pb-6">
                                <p className="font-normal text-lg leading-8 text-black">
                                    {stringItems}
                                </p>
                                <p className="font-medium text-lg leading-8 text-black">
                                    {stringTotal}
                                </p>
                            </div>
                            <form>
                                <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                                    Shipping
                                </label>
                                <div className="flex pb-6">
                                    <div className="relative w-full">
                                        <div className=" absolute left-0 top-0 py-3 px-4">
                                            <span className="font-normal text-base text-gray-300">
                                                Second Delivery
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                                            placeholder="$5.00"
                                        />
                                        <button
                                            id="dropdown-button"
                                            data-target="dropdown-delivery"
                                            className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                                            type="button"
                                        >
                                            <svg
                                                className="ml-2 my-auto"
                                                width="12"
                                                height="7"
                                                viewBox="0 0 12 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                                                    stroke="#6B7280"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                            </svg>
                                        </button>
                                        <div
                                            id="dropdown-delivery"
                                            aria-labelledby="dropdown-delivery"
                                            className="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 bg-white right-0"
                                        >
                                            <ul
                                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="dropdown-button"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Shopping
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Images
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        News
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Finance
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                                    Promo Code
                                </label>
                                <div className="flex pb-4 w-full">
                                    <div className="relative w-full ">
                                        <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                                        <input
                                            type="text"
                                            className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                                            placeholder="xxxx xxxx xxxx"
                                        />
                                        <button
                                            id="dropdown-button"
                                            data-target="dropdown"
                                            className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                                            type="button"
                                        >
                                            <svg
                                                className="ml-2 my-auto"
                                                width="12"
                                                height="7"
                                                viewBox="0 0 12 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                                                    stroke="#6B7280"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                            </svg>
                                        </button>
                                        <div
                                            id="dropdown"
                                            className="absolute top-10 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                                        >
                                            <ul
                                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="dropdown-button"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Shopping
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Images
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        News
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Finance
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center border-b border-gray-200">
                                    <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                                        Apply
                                    </button>
                                </div>
                                <div className="flex items-center justify-between py-8">
                                    <p className="font-medium text-xl leading-8 text-black">
                                        {stringItems}
                                    </p>
                                    <p className="font-semibold text-xl leading-8 text-indigo-600">
                                        {stringTotalWithDelivery}
                                    </p>
                                </div>
                                <button
                                    onClick={checkout}
                                    className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                                >
                                    Checkout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}