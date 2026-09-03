"use client";

import Image from "next/image";
import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { ScrollAnimationTrigger } from "@/components/ui/scroll-animation-trigger";
import styles from "./LocationSection.module.css";

type LocationPoint = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  x: number;
  y: number;
};

const locations: LocationPoint[] = [
  {
    id: "ancosur",
    number: "01",
    title: "ANCOSUR INMOBILIARIA",
    description:
      "Av. San Carlos 1481, cuadra 14 · Huancayo",
    image: "/media/location/ancosur.webp",
    x: 19.7,
    y: 65.5,
  },
  {
    id: "continental",
    number: "02",
    title: "UNIVERSIDAD CONTINENTAL",
    description: "Referencia urbana",
    image: "/media/location/uc.jpg",
    x: 54.1,
    y: 18.7,
  },
  {
    id: "identidad",
    number: "03",
    title: "PARQUE DE LA IDENTIDAD WANKA",
    description: "Espacio cultural y urbano",
    image: "/media/location/identidad-wanka.jpg",
    x: 68.2,
    y: 46.2,
  },
  {
    id: "miguel-grau",
    number: "04",
    title: "PARQUE MIGUEL GRAU",
    description:
      "Espacio público y referencia del entorno",
    image: "/media/location/miguel-grau.jpg",
    x: 84.8,
    y: 71.2,
  },
  {
    id: "alilqu",
    number: "05",
    title: "ALILQU PARK",
    description: "Referencia urbana del entorno",
    image: "/media/location/allqu-park.jpeg",
    x: 96,
    y: 54.8,
  },
];

const clamp = (
  value: number,
  min: number,
  max: number,
) => Math.min(Math.max(value, min), max);

export default function LocationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [cameraFocus, setCameraFocus] = useState({
    x: 0,
    y: 0,
  });

  const mapViewportRef =
    useRef<HTMLDivElement | null>(null);

  const pointRefs =
    useRef<(HTMLButtonElement | null)[]>([]);

  const dragStartRef = useRef({
    x: 0,
    y: 0,
  });

  const dragOriginRef = useRef({
    x: 0,
    y: 0,
  });

  const pointerIdRef =
    useRef<number | null>(null);

  const activeLocation =
    locations[activeIndex];

  /* =========================================
     CENTRADO CONTROLADO DEL PIN
  ========================================= */

  const calculateFocus = useCallback(
    (index: number = activeIndex) => {
      const viewport =
        mapViewportRef.current;

      const point =
        pointRefs.current[index];

      if (!viewport || !point) {
        return;
      }

      const viewportRect =
        viewport.getBoundingClientRect();

      const pointRect =
        point.getBoundingClientRect();

      /*
       * No buscamos el centro matemático exacto
       * del viewport.
       *
       * Lo llevamos ligeramente hacia el centro
       * visual para que el resultado sea natural.
       */
      const targetX =
        viewportRect.left +
        viewportRect.width * 0.5;

      const targetY =
        viewportRect.top +
        viewportRect.height * 0.47;

      const pointCenterX =
        pointRect.left +
        pointRect.width / 2;

      const pointCenterY =
        pointRect.top +
        pointRect.height / 2;

      let deltaX =
        targetX - pointCenterX;

      let deltaY =
        targetY - pointCenterY;

      /*
       * Limitamos el movimiento de cámara.
       *
       * Así un pin en un extremo del mapa
       * no provoca un desplazamiento excesivo.
       */
      deltaX = clamp(deltaX, -260, 260);
      deltaY = clamp(deltaY, -170, 170);

      setCameraFocus({
        x: deltaX,
        y: deltaY,
      });

      setDragX(0);
      setDragY(0);
    },
    [activeIndex],
  );

  /*
   * Centrado inicial.
   */
  useLayoutEffect(() => {
    const frame =
      window.requestAnimationFrame(() => {
        calculateFocus(0);
      });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [calculateFocus]);

  /*
   * Cuando cambia el pin, esperamos un frame
   * para medir su posición real antes de mover
   * la cámara.
   */
  useEffect(() => {
    const frame =
      window.requestAnimationFrame(() => {
        calculateFocus(activeIndex);
      });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [activeIndex, calculateFocus]);

  /*
   * Recalcular al redimensionar.
   */
  useEffect(() => {
    const handleResize = () => {
      calculateFocus(activeIndex);
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, [activeIndex, calculateFocus]);

  /* =========================================
     AUTOPLAY
  ========================================= */

  useEffect(() => {
    if (isPaused || isDragging) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        return (
          (current + 1) %
          locations.length
        );
      });

      setDragX(0);
      setDragY(0);
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused, isDragging]);

  /* =========================================
     ACTIVAR UBICACIÓN
  ========================================= */

  const activateLocation = (
    index: number,
  ) => {
    setActiveIndex(index);

    setDragX(0);
    setDragY(0);

    setIsPaused(true);

    window.setTimeout(() => {
      setIsPaused(false);
    }, 6500);
  };

  /* =========================================
     DRAG START
  ========================================= */

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse") {
      return;
    }

    const target =
      event.target as HTMLElement;

    if (target.closest("button")) {
      return;
    }

    pointerIdRef.current =
      event.pointerId;

    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    dragOriginRef.current = {
      x: dragX,
      y: dragY,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    setIsDragging(true);
    setIsPaused(true);
  };

  /* =========================================
     DRAG MOVE
  ========================================= */

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      pointerIdRef.current !==
      event.pointerId
    ) {
      return;
    }

    const deltaX =
      event.clientX -
      dragStartRef.current.x;

    const deltaY =
      event.clientY -
      dragStartRef.current.y;

    const maxX = 135;
    const maxY = 95;

    const nextX = clamp(
      dragOriginRef.current.x +
        deltaX * 0.72,
      -maxX,
      maxX,
    );

    const nextY = clamp(
      dragOriginRef.current.y +
        deltaY * 0.72,
      -maxY,
      maxY,
    );

    setDragX(nextX);
    setDragY(nextY);
  };

  /* =========================================
     DRAG END
  ========================================= */

  const handlePointerEnd = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      pointerIdRef.current !==
      event.pointerId
    ) {
      return;
    }

    pointerIdRef.current = null;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    } catch {
      // Pointer capture ya liberado.
    }

    setIsDragging(false);

    window.setTimeout(() => {
      setIsPaused(false);
    }, 3500);
  };

  return (
    <section className={styles.section}>
      {/* =====================================
          MAPA
      ===================================== */}

      <div
        ref={mapViewportRef}
        className={styles.mapViewport}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div
          className={`${styles.mapCamera} ${
            isDragging
              ? styles.mapCameraDragging
              : ""
          }`}
          style={
            {
              "--camera-focus-x": `${cameraFocus.x}px`,
              "--camera-focus-y": `${cameraFocus.y}px`,
              "--drag-x": `${dragX}px`,
              "--drag-y": `${dragY}px`,
            } as React.CSSProperties
          }
        >
          <div className={styles.mapPlane}>
            <Image
              src="/media/location.png"
              alt="Mapa arquitectónico de Huancayo"
              fill
              sizes="(max-width: 768px) 180vw, 140vw"
              className={styles.mapImage}
              priority
            />

            <div
              className={styles.mapOverlay}
              aria-hidden="true"
            />

            {/* =================================
                PINS
            ================================= */}

            <div className={styles.points}>
              {locations.map(
                (location, index) => {
                  const isActive =
                    activeIndex === index;

                  const isMain =
                    index === 0;

                  return (
                    <button
                      key={location.id}
                      ref={(element) => {
                        pointRefs.current[
                          index
                        ] = element;
                      }}
                      type="button"
                      className={`${styles.point} ${
                        isActive
                          ? styles.pointActive
                          : ""
                      } ${
                        isMain
                          ? styles.pointMain
                          : styles.pointReference
                      }`}
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`,
                      }}
                      onMouseEnter={() => {
                        if (!isDragging) {
                          activateLocation(
                            index,
                          );
                        }
                      }}
                      onFocus={() =>
                        activateLocation(
                          index,
                        )
                      }
                      onClick={() =>
                        activateLocation(
                          index,
                        )
                      }
                      aria-label={`Mostrar ${location.title}`}
                      aria-pressed={isActive}
                    >
                      {isMain ? (
                        <>
                          <span
                            className={
                              styles.mainShadow
                            }
                          />

                          <span
                            className={
                              styles.mainStem
                            }
                          />

                          <span
                            className={
                              styles.mainBase
                            }
                          />

                          <span
                            className={
                              styles.buildingPin
                            }
                          >
                            <Image
                              src="/media/location/ancosur-pin.png"
                              alt=""
                              fill
                              sizes="100px"
                              className={
                                styles.buildingImage
                              }
                            />
                          </span>

                          <span
                            className={
                              styles.mainPulse
                            }
                          />
                        </>
                      ) : (
                        <>
                          <span
                            className={
                              styles.referenceShadow
                            }
                          />

                          <span
                            className={
                              styles.referenceStem
                            }
                          />

                          <span
                            className={
                              styles.referencePin
                            }
                          >
                            <span
                              className={
                                styles.referenceNumber
                              }
                            >
                              {location.number}
                            </span>
                          </span>

                          <span
                            className={
                              styles.referencePulse
                            }
                          />
                        </>
                      )}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>

        <div
          className={styles.dragHint}
          aria-hidden="true"
        >
          <span>
            DESLIZA PARA EXPLORAR
          </span>
        </div>
      </div>

      {/* =====================================
          HEADER
      ===================================== */}

      <div className={styles.header}>
        <ScrollAnimationTrigger
          effect="fade"
          threshold={0.15}
          duration={0.8}
          once
        >
          <span className={styles.eyebrow}>
            UBICACIÓN
          </span>

          <h2 className={styles.title}>
            Cerca de todo.
            <br />
            <em>
              Conectados al entorno.
            </em>
          </h2>
        </ScrollAnimationTrigger>
      </div>

      {/* =====================================
          INFO CARD
      ===================================== */}

      <div className={styles.infoCard}>
        <div className={styles.imageWrapper}>
          <Image
            key={activeLocation.image}
            src={activeLocation.image}
            alt={activeLocation.title}
            fill
            sizes="380px"
            className={styles.locationImage}
          />

          <span className={styles.imageNumber}>
            {activeLocation.number}
          </span>
        </div>

        <div className={styles.infoContent}>
          <span className={styles.infoEyebrow}>
            REFERENCIA
          </span>

          <h3>
            {activeLocation.title}
          </h3>

          <p>
            {activeLocation.description}
          </p>

          <div
            className={
              styles.infoProgress
            }
          >
            <span
              style={{
                width: `${
                  ((activeIndex + 1) /
                    locations.length) *
                  100
                }%`,
              }}
            />
          </div>

          <div
            className={
              styles.infoFooter
            }
          >
            <span>
              {String(
                activeIndex + 1,
              ).padStart(2, "0")}
            </span>

            <span>/</span>

            <span>
              {String(
                locations.length,
              ).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================
          NAVEGACIÓN
      ===================================== */}

      <nav
        className={styles.navigation}
        aria-label="Referencias del entorno"
      >
        {locations.map(
          (location, index) => {
            const isActive =
              activeIndex === index;

            return (
              <button
                key={location.id}
                type="button"
                className={`${styles.navigationItem} ${
                  isActive
                    ? styles.navigationItemActive
                    : ""
                }`}
                onMouseEnter={() => {
                  if (!isDragging) {
                    activateLocation(
                      index,
                    );
                  }
                }}
                onFocus={() =>
                  activateLocation(
                    index,
                  )
                }
                onClick={() =>
                  activateLocation(
                    index,
                  )
                }
                aria-pressed={isActive}
              >
                <span>
                  {location.number}
                </span>

                <strong>
                  {location.title}
                </strong>
              </button>
            );
          },
        )}
      </nav>
    </section>
  );
}