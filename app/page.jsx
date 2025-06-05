"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Atom } from "@/components/atom";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ScrollableScene } from "@/components/scrollableScene";

export default function Home() {
  return <ScrollableScene />;
}
