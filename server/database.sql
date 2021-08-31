CREATE TABLE IF NOT EXISTS public.items
(
    item_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    item_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    item_description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    item_price integer NOT NULL,
    item_image character varying(255) COLLATE pg_catalog."default",
    item_state character varying(255) COLLATE pg_catalog."default",
    item_owner uuid NOT NULL,
    item_posted boolean DEFAULT false,
    item_street character varying(255) COLLATE pg_catalog."default",
    item_street_number character varying(255) COLLATE pg_catalog."default",
    item_city character varying(255) COLLATE pg_catalog."default",
    item_lat character varying(255) COLLATE pg_catalog."default",
    item_long character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT item_pkey PRIMARY KEY (item_id)
)

CREATE TABLE IF NOT EXISTS public.messages
(
    message_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    sender_id uuid NOT NULL,
    receiver_id uuid NOT NULL,
    message_title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    message_text character varying(255) COLLATE pg_catalog."default",
    sender_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    message_is_read boolean DEFAULT false,
    receiver_name character varying(255) COLLATE pg_catalog."default",
    time_created timestamp(6) without time zone DEFAULT (now())::timestamp without time zone,
    CONSTRAINT messages_pkey PRIMARY KEY (message_id)
)

CREATE TABLE IF NOT EXISTS public.notifications
(
    notification_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    notification_owner_id uuid NOT NULL,
    notification_maker_id uuid NOT NULL,
    notification_maker_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    notification_type character varying(255) COLLATE pg_catalog."default",
    related_item_id uuid,
    related_item_name character varying(255) COLLATE pg_catalog."default",
    delivery_type boolean,
    time_created character varying(255) COLLATE pg_catalog."default",
    clear_notification boolean DEFAULT false,
    return_type integer,
    CONSTRAINT notifications_pkey PRIMARY KEY (notification_id)
)

CREATE TABLE IF NOT EXISTS public.users
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_street character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_city character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_state character varying COLLATE pg_catalog."default" NOT NULL,
    lat character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "long" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_street_number character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_image character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
    )

CREATE TABLE IF NOT EXISTS public.rented_items
(
    rented_item_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    owner_id uuid NOT NULL,
    renter_id uuid NOT NULL,
    item_id uuid NOT NULL,
    duration integer NOT NULL,
    price_per_day integer NOT NULL,
    price integer NOT NULL,
    item_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    delivery_type integer NOT NULL,
    paid boolean,
    code_entered boolean DEFAULT false,
    renting_status boolean DEFAULT true,
    confirmation_code character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT floor(((10000)::double precision + (random() * (89999)::double precision))),
    renter_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    owner_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    return_type integer,
    time_rent_started timestamp(6) without time zone DEFAULT (now())::timestamp without time zone,
    item_image character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT "rentedItems_pkey" PRIMARY KEY (rented_item_id)
)