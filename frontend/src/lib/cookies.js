import { isServer } from "@/lib/utils"

export const getCookies = () => {
    if (isServer()) {
        const { cookies } = require("next/headers")
        let result = {}
        cookies().getAll().forEach((cookie) => {
            result[cookie.name] = cookie.value
        })
        return result
    }
    else {
        const Cookies = require("js-cookie")
        return Cookies.get()
    }
}

export const setCookie = (name, value, options) => {
    if (isServer()) {
        const { cookies } = require("next/headers")
        cookies().set(name, value, options)
    }
    else {
        const Cookies = require("js-cookie")
        Cookies.set(name, value, options)
    }
}

export const removeCookie = (name) => {
    if (isServer()) {
        const { cookies } = require("next/headers")
        cookies().delete(name)
    }
    else {
        const Cookies = require("js-cookie")
        Cookies.remove(name)
    }
}