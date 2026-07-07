import type { Question, Technology } from '@/types'
import technologies from '@/data/technologies.json'
import categories from '@/data/categories.json'
import roadmaps from '@/data/roadmaps.json'

// Static imports for all question banks so Vite bundles them.
import react from '@/data/questions/react.json'
import javascript from '@/data/questions/javascript.json'
import typescript from '@/data/questions/typescript.json'
import csharp from '@/data/questions/csharp.json'
import java from '@/data/questions/java.json'
import python from '@/data/questions/python.json'
import cpp from '@/data/questions/cpp.json'
import go from '@/data/questions/go.json'
import html from '@/data/questions/html.json'
import css from '@/data/questions/css.json'
import bootstrap from '@/data/questions/bootstrap.json'
import tailwind from '@/data/questions/tailwind.json'
import angular from '@/data/questions/angular.json'
import vue from '@/data/questions/vue.json'
import aspnet from '@/data/questions/aspnet.json'
import node from '@/data/questions/node.json'
import express from '@/data/questions/express.json'
import spring from '@/data/questions/spring.json'
import sqlserver from '@/data/questions/sqlserver.json'
import mysql from '@/data/questions/mysql.json'
import postgres from '@/data/questions/postgres.json'
import mongo from '@/data/questions/mongo.json'
import azure from '@/data/questions/azure.json'
import aws from '@/data/questions/aws.json'
import docker from '@/data/questions/docker.json'
import kubernetes from '@/data/questions/kubernetes.json'
import git from '@/data/questions/git.json'
import github from '@/data/questions/github.json'
import postman from '@/data/questions/postman.json'

// Additional programming languages
import c from '@/data/questions/c.json'
import rust from '@/data/questions/rust.json'
import kotlin from '@/data/questions/kotlin.json'
import swift from '@/data/questions/swift.json'
import php from '@/data/questions/php.json'
import ruby from '@/data/questions/ruby.json'
import scala from '@/data/questions/scala.json'
import dart from '@/data/questions/dart.json'
import r from '@/data/questions/r.json'
import perl from '@/data/questions/perl.json'
import objectivec from '@/data/questions/objectivec.json'
import haskell from '@/data/questions/haskell.json'
import elixir from '@/data/questions/elixir.json'
import erlang from '@/data/questions/erlang.json'
import clojure from '@/data/questions/clojure.json'
import fsharp from '@/data/questions/fsharp.json'
import lua from '@/data/questions/lua.json'
import julia from '@/data/questions/julia.json'
import groovy from '@/data/questions/groovy.json'
import solidity from '@/data/questions/solidity.json'
import bash from '@/data/questions/bash.json'
import powershell from '@/data/questions/powershell.json'
import cobol from '@/data/questions/cobol.json'
import assembly from '@/data/questions/assembly.json'
import zig from '@/data/questions/zig.json'
import mojo from '@/data/questions/mojo.json'
import gleam from '@/data/questions/gleam.json'
import nim from '@/data/questions/nim.json'
import crystal from '@/data/questions/crystal.json'

const questionMap: Record<string, Question[]> = {
  react,
  javascript,
  typescript,
  csharp,
  java,
  python,
  cpp,
  go,
  html,
  css,
  bootstrap,
  tailwind,
  angular,
  vue,
  aspnet,
  node,
  express,
  spring,
  sqlserver,
  mysql,
  postgres,
  mongo,
  azure,
  aws,
  docker,
  kubernetes,
  git,
  github,
  postman,
  c,
  rust,
  kotlin,
  swift,
  php,
  ruby,
  scala,
  dart,
  r,
  perl,
  objectivec,
  haskell,
  elixir,
  erlang,
  clojure,
  fsharp,
  lua,
  julia,
  groovy,
  solidity,
  bash,
  powershell,
  cobol,
  assembly,
  zig,
  mojo,
  gleam,
  nim,
  crystal,
} as unknown as Record<string, Question[]>

export function getTechnologies(): Technology[] {
  return technologies as Technology[]
}

export function getTechnology(id: string): Technology | undefined {
  return (technologies as Technology[]).find((t) => t.id === id)
}

export function getCategories(): string[] {
  return categories as string[]
}

export function getRoadmaps() {
  return roadmaps as import('@/types').Roadmap[]
}

export function getRoadmap(id: string) {
  return (roadmaps as import('@/types').Roadmap[]).find((r) => r.id === id)
}

export function getQuestions(techId: string): Question[] {
  return questionMap[techId] ?? []
}

export function getQuestion(techId: string, questionId: number) {
  return getQuestions(techId).find((q) => q.id === questionId)
}

export function getAllQuestions(): { tech: Technology; question: Question }[] {
  const techs = getTechnologies()
  const all: { tech: Technology; question: Question }[] = []
  for (const t of techs) {
    for (const q of getQuestions(t.id)) all.push({ tech: t, question: q })
  }
  return all
}
