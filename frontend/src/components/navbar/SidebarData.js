import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Class Management',
        path : '/class-management',
        icon: <AiIcons.AiFillHome/>,
        //short for class name
        cName : 'nav-text'
    },
    {
        title: 'Active Classes',
        path : '/active-class',
        icon: <AiIcons.AiFillHome/>,
        //short for class name
        cName : 'nav-text'
    },
    {
        title: 'Teacher Management',
        path : '/',
        icon: <AiIcons.AiFillHome/>,
        //short for class name
        cName : 'nav-text'
    },
    {
        title: 'Student Management',
        path : '/',
        icon: <AiIcons.AiFillHome/>,
        //short for class name
        cName : 'nav-text'
    },
    {
        title: 'Account Management',
        path : '/',
        icon: <AiIcons.AiFillHome/>,
        //short for class name
        cName : 'nav-text'
    },
    {
        title: 'Special Days Management',
        path : '/',
        icon: <AiIcons.AiFillHome/>,
        //short for class name
        cName : 'nav-text'
    }
]