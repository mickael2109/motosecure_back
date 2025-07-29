--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Debian 16.9-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: mc_bd_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO mc_bd_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Coordinate; Type: TABLE; Schema: public; Owner: mc_bd_user
--

CREATE TABLE public."Coordinate" (
    id integer NOT NULL,
    "motoId" integer NOT NULL,
    long double precision NOT NULL,
    lat double precision NOT NULL,
    speed double precision NOT NULL,
    cap text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Coordinate" OWNER TO mc_bd_user;

--
-- Name: Coordinate_id_seq; Type: SEQUENCE; Schema: public; Owner: mc_bd_user
--

CREATE SEQUENCE public."Coordinate_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Coordinate_id_seq" OWNER TO mc_bd_user;

--
-- Name: Coordinate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mc_bd_user
--

ALTER SEQUENCE public."Coordinate_id_seq" OWNED BY public."Coordinate".id;


--
-- Name: Moto; Type: TABLE; Schema: public; Owner: mc_bd_user
--

CREATE TABLE public."Moto" (
    id integer NOT NULL,
    num_serie text NOT NULL,
    pseudo text NOT NULL,
    status boolean DEFAULT false NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Moto" OWNER TO mc_bd_user;

--
-- Name: Moto_id_seq; Type: SEQUENCE; Schema: public; Owner: mc_bd_user
--

CREATE SEQUENCE public."Moto_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Moto_id_seq" OWNER TO mc_bd_user;

--
-- Name: Moto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mc_bd_user
--

ALTER SEQUENCE public."Moto_id_seq" OWNED BY public."Moto".id;


--
-- Name: Notification; Type: TABLE; Schema: public; Owner: mc_bd_user
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    "motoId" integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Notification" OWNER TO mc_bd_user;

--
-- Name: Notification_id_seq; Type: SEQUENCE; Schema: public; Owner: mc_bd_user
--

CREATE SEQUENCE public."Notification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notification_id_seq" OWNER TO mc_bd_user;

--
-- Name: Notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mc_bd_user
--

ALTER SEQUENCE public."Notification_id_seq" OWNED BY public."Notification".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: mc_bd_user
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text,
    pseudo text,
    email text NOT NULL,
    password text NOT NULL,
    adresse text,
    phone text,
    url text,
    status boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO mc_bd_user;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: mc_bd_user
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO mc_bd_user;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mc_bd_user
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: mc_bd_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO mc_bd_user;

--
-- Name: Coordinate id; Type: DEFAULT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."Coordinate" ALTER COLUMN id SET DEFAULT nextval('public."Coordinate_id_seq"'::regclass);


--
-- Name: Moto id; Type: DEFAULT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."Moto" ALTER COLUMN id SET DEFAULT nextval('public."Moto_id_seq"'::regclass);


--
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Coordinate; Type: TABLE DATA; Schema: public; Owner: mc_bd_user
--

COPY public."Coordinate" (id, "motoId", long, lat, speed, cap, date, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Moto; Type: TABLE DATA; Schema: public; Owner: mc_bd_user
--

COPY public."Moto" (id, num_serie, pseudo, status, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: mc_bd_user
--

COPY public."Notification" (id, "motoId", title, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: mc_bd_user
--

COPY public."User" (id, name, pseudo, email, password, adresse, phone, url, status, "createdAt", "updatedAt") FROM stdin;
1	\N	\N	mickaelrkt20@gmail.com	$2b$10$CJTLyYn3oiPCnAtY2xsxN.7LFShiKIQz2CDxoR8D/YBxQwrvDRbtK	\N	\N	\N	f	2025-07-28 13:02:11.632	2025-07-28 13:02:11.632
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: mc_bd_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
706629c4-3ba7-4c76-8a8a-9f7d12be2028	39510be02c411a504a97f5b6f70ec3e088edf1ae85d3fc12566ff767d967658e	2025-07-28 12:35:58.549552+00	20250723093027_init	\N	\N	2025-07-28 12:35:58.437079+00	1
\.


--
-- Name: Coordinate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mc_bd_user
--

SELECT pg_catalog.setval('public."Coordinate_id_seq"', 1, false);


--
-- Name: Moto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mc_bd_user
--

SELECT pg_catalog.setval('public."Moto_id_seq"', 1, false);


--
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mc_bd_user
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mc_bd_user
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- Name: Coordinate Coordinate_pkey; Type: CONSTRAINT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."Coordinate"
    ADD CONSTRAINT "Coordinate_pkey" PRIMARY KEY (id);


--
-- Name: Moto Moto_pkey; Type: CONSTRAINT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."Moto"
    ADD CONSTRAINT "Moto_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Moto_num_serie_key; Type: INDEX; Schema: public; Owner: mc_bd_user
--

CREATE UNIQUE INDEX "Moto_num_serie_key" ON public."Moto" USING btree (num_serie);


--
-- Name: Coordinate Coordinate_motoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."Coordinate"
    ADD CONSTRAINT "Coordinate_motoId_fkey" FOREIGN KEY ("motoId") REFERENCES public."Moto"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Moto Moto_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."Moto"
    ADD CONSTRAINT "Moto_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notification Notification_motoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mc_bd_user
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_motoId_fkey" FOREIGN KEY ("motoId") REFERENCES public."Moto"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO mc_bd_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO mc_bd_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO mc_bd_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO mc_bd_user;


--
-- PostgreSQL database dump complete
--

