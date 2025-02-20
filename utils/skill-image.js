
import angular from '../app/assets/svg/skills/angular.svg';
import bootstrap from '../app/assets/svg/skills/bootstrap.svg';
import c from '../app/assets/svg/skills/c.svg';
import canva from '../app/assets/svg/skills/canva.svg';
import css from '../app/assets/svg/skills/css.svg';
import docker from '../app/assets/svg/skills/docker.svg';
import figma from '../app/assets/svg/skills/figma.svg';
import firebase from '../app/assets/svg/skills/firebase.svg';
import git from '../app/assets/svg/skills/git.svg';
import html from '../app/assets/svg/skills/html.svg';
import java from '../app/assets/svg/skills/java.svg';
import javascript from '../app/assets/svg/skills/javascript.svg';
import { SiGithub, SiSpring } from 'react-icons/si';
import mongoDB from '../app/assets/svg/skills/mongoDB.svg';
import mysql from '../app/assets/svg/skills/mysql.svg';
import nextJS from '../app/assets/svg/skills/nextJS.svg';
import { BsGithub } from 'react-icons/bs';
import php from '../app/assets/svg/skills/php.svg';
import postgresql from '../app/assets/svg/skills/postgresql.svg';
import { SiPostman } from 'react-icons/si';
import react from '../app/assets/svg/skills/react.svg';
import selenium from '../app/assets/svg/skills/selenium.svg';
import typescript from '../app/assets/svg/skills/typescript.svg';import tailwind from '../app/assets/svg/skills/tailwind.svg';
import vue from '../app/assets/svg/skills/vue.svg';



export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case 'html':
      return html;
    case 'docker':
      return docker;

    case 'css':
      return css;
    case 'angular':
      return angular;
    case 'javascript':
      return javascript;
    case 'next js':
      return nextJS;
      case 'postman':
        return SiPostman;
  case 'spring':
    return SiSpring;
  
    case 'react':
      return react;
    case 'typescript':
      return typescript;
    case 'vue':
      return vue;
    case 'bootstrap':
      return  ;
      case 'mongoDB':
      return mongoDB;
    case 'mysql':
      return mysql;
    case 'postgresql':
      return postgresql;
    case 'tailwind':
      return tailwind;
      case 'github':
        return SiGithub;
      case 'c':
        return c;
    case 'java':
      return java;
    case 'php':
      return php;
    case 'firebase':
      return firebase;
    case 'git':
      return git;


    case 'selenium':
      return selenium;
    case 'figma':
      return figma;
    case 'canva':
      return canva;
   
    default:
      break;
  }
}
