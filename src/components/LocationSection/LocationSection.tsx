"use client";

import Image from "next/image";
import {
  PointerEvent as ReactPointerEvent,
  useCallback,
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
) => {
  return Math.min(
    Math.max(value, min),
    max,
  );
};

export default function LocationSection() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [cameraFocus, setCameraFocus] =
    useState({
      x: 0,
      y: 0,
    });

  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);

  const [isDragging, setIsDragging] =
    useState(false);

  const viewportRef =
    useRef<HTMLDivElement | null>(null);

  const pointRefs =
    useRef<(HTMLButtonElement | null)[]>(
      [],
    );

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
     CENTRAR PIN
     
     Esta función SOLO se ejecuta cuando
     el usuario selecciona un pin.
  ========================================= */

  const centerLocation = useCallback(
    (index: number) => {
      const viewport =
        viewportRef.current;

      const point =
        pointRefs.current[index];

      if (!viewport || !point) {
        return;
      }

      /*
       * Quitamos solamente el drag manual
       * anterior para poder medir la posición
       * del pin desde la cámara actual.
       */
      setDragX(0);
      setDragY(0);

      requestAnimationFrame(() => {
        const viewportElement =
          viewportRef.current;

        const pointElement =
          pointRefs.current[index];

        if (
          !viewportElement ||
          !pointElement
        ) {
          return;
        }

        const viewportRect =
          viewportElement.getBoundingClientRect();

        const pointRect =
          pointElement.getBoundingClientRect();

        const viewportCenterX =
          viewportRect.left +
          viewportRect.width / 2;

        const viewportCenterY =
          viewportRect.top +
          viewportRect.height *
            0.43;

        const pointCenterX =
          pointRect.left +
          pointRect.width / 2;

        const pointCenterY =
          pointRect.top +
          pointRect.height / 2;

        const isMobile =
          window.innerWidth <= 768;

        const isTablet =
          window.innerWidth > 768 &&
          window.innerWidth <= 1100;

        let deltaX =
          viewportCenterX -
          pointCenterX;

        let deltaY =
          viewportCenterY -
          pointCenterY;

        /*
         * LIMITES DE ENFOQUE
         *
         * El centrado nunca puede sacar
         * exageradamente el mapa.
         */
        if (isMobile) {
          deltaX = clamp(
            deltaX,
            -125,
            125,
          );

          deltaY = clamp(
            deltaY,
            -75,
            75,
          );
        } else if (isTablet) {
          deltaX = clamp(
            deltaX,
            -190,
            190,
          );

          deltaY = clamp(
            deltaY,
            -110,
            110,
          );
        } else {
          deltaX = clamp(
            deltaX,
            -260,
            260,
          );

          deltaY = clamp(
            deltaY,
            -155,
            155,
          );
        }

        setCameraFocus({
          x: deltaX,
          y: deltaY,
        });
      });
    },
    [],
  );

  /* =========================================
     CENTRADO INICIAL
     
     Una sola vez al montar.
     NO vuelve a ejecutarse por activeIndex.
  ========================================= */

  useLayoutEffect(() => {
    const frame =
      requestAnimationFrame(() => {
        const viewport =
          viewportRef.current;

        const point =
          pointRefs.current[0];

        if (!viewport || !point) {
          return;
        }

        const viewportRect =
          viewport.getBoundingClientRect();

        const pointRect =
          point.getBoundingClientRect();

        const viewportCenterX =
          viewportRect.left +
          viewportRect.width / 2;

        const viewportCenterY =
          viewportRect.top +
          viewportRect.height *
            0.43;

        const pointCenterX =
          pointRect.left +
          pointRect.width / 2;

        const pointCenterY =
          pointRect.top +
          pointRect.height / 2;

        const isMobile =
          window.innerWidth <= 768;

        const deltaX =
          viewportCenterX -
          pointCenterX;

        const deltaY =
          viewportCenterY -
          pointCenterY;

        setCameraFocus({
          x: isMobile
            ? clamp(deltaX, -125, 125)
            : clamp(deltaX, -260, 260),

          y: isMobile
            ? clamp(deltaY, -75, 75)
            : clamp(deltaY, -155, 155),
        });
      });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  /* =========================================
     SELECT LOCATION
     
     SOLO TAP / CLICK
  ========================================= */

  const selectLocation = (
    index: number,
  ) => {
    setActiveIndex(index);

    centerLocation(index);
  };

  /* =========================================
     POINTER DOWN
  ========================================= */

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    /*
     * Solo touch y pen.
     */
    if (event.pointerType === "mouse") {
      return;
    }

    const target =
      event.target as HTMLElement;

    /*
     * Los botones no inician drag.
     */
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
  };

  /* =========================================
     POINTER MOVE
     
     EL SWIPE ES TOTALMENTE MANUAL.
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

    const viewportWidth =
      viewportRef.current?.clientWidth ??
      window.innerWidth;

    const viewportHeight =
      viewportRef.current?.clientHeight ??
      window.innerHeight;

    const isMobile =
      window.innerWidth <= 768;

    const isTablet =
      window.innerWidth > 768 &&
      window.innerWidth <= 1100;

    /*
     * El rango se calcula proporcionalmente
     * a la pantalla y además tiene un mínimo.
     *
     * Esto permite recorrer todo el mapa
     * en ambas direcciones.
     */
    let maxX =
      Math.max(
        viewportWidth * 0.62,
        360,
      );

    let maxY =
      Math.max(
        viewportHeight * 0.23,
        130,
      );

    let sensitivity = 0.78;

    if (isMobile) {
      maxX =
        Math.max(
          viewportWidth * 1.05,
          430,
        );

      maxY =
        Math.max(
          viewportHeight * 0.42,
          190,
        );

      sensitivity = 0.82;
    } else if (isTablet) {
      maxX =
        Math.max(
          viewportWidth * 0.75,
          300,
        );

      maxY =
        Math.max(
          viewportHeight * 0.3,
          140,
        );

      sensitivity = 0.74;
    }

    const nextX = clamp(
      dragOriginRef.current.x +
        deltaX * sensitivity,
      -maxX,
      maxX,
    );

    const nextY = clamp(
      dragOriginRef.current.y +
        deltaY * sensitivity,
      -maxY,
      maxY,
    );

    setDragX(nextX);
    setDragY(nextY);
  };

  /* =========================================
     POINTER END
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
  };

  return (
    <section className={styles.section}>
      {/* =====================================
          MAP VIEWPORT
      ===================================== */}

      <div
        ref={viewportRef}
        className={styles.mapViewport}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div className={styles.mapCamera}>
          <div
            className={`${styles.mapPan} ${
              isDragging
                ? styles.mapPanDragging
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
            <div
              className={styles.mapPlane}
            >
              <Image
                src="/media/location.png"
                alt="Mapa arquitectónico de Huancayo"
                fill
                priority
                sizes="(max-width: 768px) 160vw, 130vw"
                className={styles.mapImage}
              />

              <div
                className={
                  styles.mapOverlay
                }
                aria-hidden="true"
              />

              {/* =================================
                  PINS
              ================================= */}

              <div className={styles.points}>
                {locations.map(
                  (
                    location,
                    index,
                  ) => {
                    const isActive =
                      index ===
                      activeIndex;

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
                        onClick={() =>
                          selectLocation(
                            index,
                          )
                        }
                        aria-label={`Mostrar ${location.title}`}
                        aria-pressed={
                          isActive
                        }
                      >
                        {isMain ? (
                          <>
                            <span
                              className={
                                styles.mainHalo
                              }
                            />

                            <span
                              className={
                                styles.mainStem
                              }
                            />

                            <span
                              className={
                                styles.mainMarker
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
                                styles.mainDot
                              }
                            />
                          </>
                        ) : (
                          <>
                            <span
                              className={
                                styles.referenceHalo
                              }
                            />

                            <span
                              className={
                                styles.referenceStem
                              }
                            />

                            <span
                              className={
                                styles.referenceMarker
                              }
                            >
                              <span
                                className={
                                  styles.referenceNumber
                                }
                              >
                                {
                                  location.number
                                }
                              </span>
                            </span>

                            <span
                              className={
                                styles.referenceDot
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
        </div>

        <div
          className={styles.dragHint}
          aria-hidden="true"
        >
          DESLIZA PARA EXPLORAR
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

          <span
            className={styles.imageNumber}
          >
            {activeLocation.number}
          </span>
        </div>

        <div className={styles.infoContent}>
          <span
            className={styles.infoEyebrow}
          >
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
          NAVIGATION
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
                onClick={() =>
                  selectLocation(
                    index,
                  )
                }
                aria-pressed={
                  isActive
                }
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