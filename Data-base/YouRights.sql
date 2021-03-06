PGDMP                         w           postgres    11.5    11.5 $    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            0           1262    13012    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE postgres;
             admin_1    false            1           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                  admin_1    false    2864                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                  false            2           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                       false    1            �            1259    16435 	   cities_ES    TABLE     �   CREATE TABLE public."cities_ES" (
    id_cities character varying(100) NOT NULL,
    name_cities character varying(200) NOT NULL
);
    DROP TABLE public."cities_ES";
       public         admin_1    false            �            1259    16430 	   countries    TABLE     �   CREATE TABLE public.countries (
    id_countries character varying(100) NOT NULL,
    name_countries character varying(200) NOT NULL
);
    DROP TABLE public.countries;
       public         admin_1    false            �            1259    16470    districts_ES    TABLE     �   CREATE TABLE public."districts_ES" (
    id_districts character varying(5) NOT NULL,
    name_districts character varying(30) NOT NULL
);
 "   DROP TABLE public."districts_ES";
       public         admin_1    false            �            1259    16477    insert_protest    TABLE     �  CREATE TABLE public.insert_protest (
    id_internal_protest integer NOT NULL,
    country_insert_protest character varying(30) NOT NULL,
    city_insert_protest character varying(30) NOT NULL,
    date_insert_protest timestamp without time zone NOT NULL,
    type_insert_protest character varying(30) NOT NULL,
    type_user_insert_protest character varying(30) NOT NULL,
    type_defence_insert_protest character varying(30) NOT NULL,
    decription_defence_insert_protest character varying(100) NOT NULL,
    street1_insert_protest character varying(30) NOT NULL,
    n_street1_insert_protest character varying(30) NOT NULL,
    street2_insert_protest character varying(30) NOT NULL,
    n_street2_insert_protest character varying(30) NOT NULL,
    street3_insert_protest character varying(30) NOT NULL,
    n_street3_insert_protest character varying(30) NOT NULL,
    street4_insert_protest character varying(30) NOT NULL,
    n_street4_insert_protest character varying(30) NOT NULL
);
 "   DROP TABLE public.insert_protest;
       public         admin_1    false            �            1259    16475 &   insert_protest_id_internal_protest_seq    SEQUENCE     �   CREATE SEQUENCE public.insert_protest_id_internal_protest_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.insert_protest_id_internal_protest_seq;
       public       admin_1    false    204            3           0    0 &   insert_protest_id_internal_protest_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.insert_protest_id_internal_protest_seq OWNED BY public.insert_protest.id_internal_protest;
            public       admin_1    false    203            �            1259    16465    list_protest    TABLE     �  CREATE TABLE public.list_protest (
    id_internal_protest integer NOT NULL,
    name_protest character varying(30) NOT NULL,
    who_defends character varying(30) NOT NULL,
    promoted_by character varying(30) NOT NULL,
    area_protest character varying(30) NOT NULL,
    date_time_protest timestamp without time zone NOT NULL,
    country character varying(3),
    district character varying(3),
    cities character varying(3),
    type_protest character varying(15)
);
     DROP TABLE public.list_protest;
       public         admin_1    false            �            1259    16450    register    TABLE     ~  CREATE TABLE public.register (
    id_internal_user integer NOT NULL,
    id_user character varying(100) NOT NULL,
    name_user character varying(100) NOT NULL,
    surname_user character varying(100) NOT NULL,
    email_user character varying(100) NOT NULL,
    phone_user numeric,
    password_user character varying(10) NOT NULL,
    type_user character varying(50) NOT NULL
);
    DROP TABLE public.register;
       public         admin_1    false            �            1259    16448    register_id_internal_user_seq    SEQUENCE     �   CREATE SEQUENCE public.register_id_internal_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.register_id_internal_user_seq;
       public       admin_1    false    200            4           0    0    register_id_internal_user_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.register_id_internal_user_seq OWNED BY public.register.id_internal_user;
            public       admin_1    false    199            �
           2604    16480 "   insert_protest id_internal_protest    DEFAULT     �   ALTER TABLE ONLY public.insert_protest ALTER COLUMN id_internal_protest SET DEFAULT nextval('public.insert_protest_id_internal_protest_seq'::regclass);
 Q   ALTER TABLE public.insert_protest ALTER COLUMN id_internal_protest DROP DEFAULT;
       public       admin_1    false    204    203    204            �
           2604    16453    register id_internal_user    DEFAULT     �   ALTER TABLE ONLY public.register ALTER COLUMN id_internal_user SET DEFAULT nextval('public.register_id_internal_user_seq'::regclass);
 H   ALTER TABLE public.register ALTER COLUMN id_internal_user DROP DEFAULT;
       public       admin_1    false    200    199    200            $          0    16435 	   cities_ES 
   TABLE DATA               =   COPY public."cities_ES" (id_cities, name_cities) FROM stdin;
    public       admin_1    false    198   �-       #          0    16430 	   countries 
   TABLE DATA               A   COPY public.countries (id_countries, name_countries) FROM stdin;
    public       admin_1    false    197   �/       (          0    16470    districts_ES 
   TABLE DATA               F   COPY public."districts_ES" (id_districts, name_districts) FROM stdin;
    public       admin_1    false    202   47       *          0    16477    insert_protest 
   TABLE DATA               �  COPY public.insert_protest (id_internal_protest, country_insert_protest, city_insert_protest, date_insert_protest, type_insert_protest, type_user_insert_protest, type_defence_insert_protest, decription_defence_insert_protest, street1_insert_protest, n_street1_insert_protest, street2_insert_protest, n_street2_insert_protest, street3_insert_protest, n_street3_insert_protest, street4_insert_protest, n_street4_insert_protest) FROM stdin;
    public       admin_1    false    204   8       '          0    16465    list_protest 
   TABLE DATA               �   COPY public.list_protest (id_internal_protest, name_protest, who_defends, promoted_by, area_protest, date_time_protest, country, district, cities, type_protest) FROM stdin;
    public       admin_1    false    201   ,8       &          0    16450    register 
   TABLE DATA               �   COPY public.register (id_internal_user, id_user, name_user, surname_user, email_user, phone_user, password_user, type_user) FROM stdin;
    public       admin_1    false    200   I8       5           0    0 &   insert_protest_id_internal_protest_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.insert_protest_id_internal_protest_seq', 1, false);
            public       admin_1    false    203            6           0    0    register_id_internal_user_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.register_id_internal_user_seq', 4, true);
            public       admin_1    false    199            �
           2606    16439    cities_ES cities_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."cities_ES"
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id_cities);
 A   ALTER TABLE ONLY public."cities_ES" DROP CONSTRAINT cities_pkey;
       public         admin_1    false    198            �
           2606    16434    countries countries_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id_countries);
 B   ALTER TABLE ONLY public.countries DROP CONSTRAINT countries_pkey;
       public         admin_1    false    197            �
           2606    16474    districts_ES districts_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."districts_ES"
    ADD CONSTRAINT districts_pkey PRIMARY KEY (id_districts);
 G   ALTER TABLE ONLY public."districts_ES" DROP CONSTRAINT districts_pkey;
       public         admin_1    false    202            �
           2606    16462    register email_user 
   CONSTRAINT     T   ALTER TABLE ONLY public.register
    ADD CONSTRAINT email_user UNIQUE (email_user);
 =   ALTER TABLE ONLY public.register DROP CONSTRAINT email_user;
       public         admin_1    false    200            �
           2606    16460    register id_user 
   CONSTRAINT     N   ALTER TABLE ONLY public.register
    ADD CONSTRAINT id_user UNIQUE (id_user);
 :   ALTER TABLE ONLY public.register DROP CONSTRAINT id_user;
       public         admin_1    false    200            �
           2606    16485 "   insert_protest insert_protest_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.insert_protest
    ADD CONSTRAINT insert_protest_pkey PRIMARY KEY (id_internal_protest);
 L   ALTER TABLE ONLY public.insert_protest DROP CONSTRAINT insert_protest_pkey;
       public         admin_1    false    204            �
           2606    16464    register phone_user 
   CONSTRAINT     T   ALTER TABLE ONLY public.register
    ADD CONSTRAINT phone_user UNIQUE (phone_user);
 =   ALTER TABLE ONLY public.register DROP CONSTRAINT phone_user;
       public         admin_1    false    200            �
           2606    16469    list_protest protest_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.list_protest
    ADD CONSTRAINT protest_pkey PRIMARY KEY (id_internal_protest);
 C   ALTER TABLE ONLY public.list_protest DROP CONSTRAINT protest_pkey;
       public         admin_1    false    201            �
           2606    16458    register register_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.register
    ADD CONSTRAINT register_pkey PRIMARY KEY (id_internal_user);
 @   ALTER TABLE ONLY public.register DROP CONSTRAINT register_pkey;
       public         admin_1    false    200            $   �  x�5�=�A��S���3�	�x�lX��Iy��j�=�z<�p�Q6$ @�A@0�
��}�U��U��&u���]���%�U��*�ы��F:`<k�	�h�_���9�/��t'��ҍ���hL����ݐ��gc�_�
���pc㨆� ��#�/��ڱ������ah��<�D6s|~�m: ��zЮ-i����SZ�dh#��A�N��u�&�:Z�('�=��i�qk����؃��n��VƯ�$'�!�𸤍�nJ����cbgi+m-;�rD��)C�U��"��f�r��ݜ�a��܂�g�ze�$�ǈ(�SzH8�U[�xC;(����-����������]*������h���������_�>Em�%=�oYMGiS�0���pk�3�>�9�G�@E�&��3��y�T      #   �  x�eV���6�_�p�{�A�(��Cl>$KgH�H������l?e�	:�q�6��|���݈�
�bU�^��?�M>e������&���P��Li����K��i�bF�n? C��TĔ>��{�|iw#3sǄt��q�;�^�����ʝ�^%���ML�`U˿-ĭD⬜9k�q��d�+�t}%Bǫ�;�_�+�"_��������N�c+a�I�>���` ����^
K>��+�/�:���3���|�Z�f���G�^��/�7�~f8��D<�ʾ��yf��5�C�U2.ɷ�׭�s��SZ��c{��?�����do�3=v�Հ���rg���%�9��μHd����	p'�Rp����V� g s��'��
����j����x*�x5uPE�����w	~e�ƪ^ �E�+��+����*��:���|g��[$%�����
�sc����2i?]�Z�7^�/5e��#���Y���e�*ӄ���,-D��~�;3ZL3����XEP��V��G�4Q�(l����;�������˿�����Nsބ%�V�ASط���kX�x��_�h�e]
�c�\M����M�قf����V?��^�b��g%ͬ�ை&���ND�{�(�H{d8���9���e�VDS�,��%�r�R ����
�َOJDg���P�ц��}v��3�-�<�!"��y�� �[�o̟}��r��R���;��	1oh>vGˁ�s��m��^�@���".��J�C �����o���Y"��J"���E��W��'�{/���*�3�yAp�X���%��(��(f���L"�b��ȹ������S��� fw��ʽmV��Ah:��������$�V4w��\jl��$V���x�QT��D&�3�J��s�%��3p!;��Eu��[X�G�
��5�PY�ދU|�.oܭȧ0l��b��I��k�&~��M`�4뜍ÈT�SX�����/2Z�~�N���X��؃k�ɖ�*?�fYR��/�(����~3C���D��d����R	ҊR՛�dD���f�Szy�h��T�7�tÐA���Au���%��FgX�P:~S��h���2�WV��~��]K܌G��<sv�,��Ae�G�fP�O���_��V���(e���j�& �L��){`b�6��1Z�װ����ٺ��/f����ˏoxd1�(�{{+�lJ�i�G[@�NB(���݀��W��mA�r_�2*�O(�g���yA�zBG�c�a���DR~y;*+�죋y� ���:>��Q�K��:�4�|T` �k�E�������-]a�)���#1}��kf�Fc�a�w�|kcE���I����E!<`E�S����3*���b�2�WԀv��(��4#&� �S7	�+��]�؏0�>Y˘���:<)��v�NQa���n�����}BQ��?p�LB��;��W��]DKh�kO� r��s��uY�-�{}��p1�����%z��s��{���>ln7�M������\[D�G���u����s-��?�R2W���4�����QՎ6hi���-0Q0@1�*؅ůP�zٟT�b��R�4g��*��D���|��6���Ւ*sv]*M���Ke��ǅ�W�}65��ǳ�jK�(_�m�TSr/���� ��c�����zN��_��L|�[��{u��/����j�]��h�t�@u.�+�j�m�[Z}}�:�ڠO�K|ᩨk�a�����I>ͩ�2�^E�O^�o�,��e��+`��Q4j����D�]�4j��ʧ�R�Sw�W�d�Ea��Vx�W�N�UN+��&���oŦ�{��mF��
�]�V�wr�n��!�FOf      (   �   x�MN;n�@��;�/@Ě��ұP�"
*��w�l����Dp(�(e

�+�������s��(����m�T|���gTǔ�E�9=�yA<Fu9��w!\	��:�����?���T���$R������t�쭆.vR�[+٬��)�tBKz��rc5���Fzt��՜69�z�7�`[��s���v�*�a[�}���|ȟQ�      *      x������ � �      '      x������ � �      &   �   x�m�M� F�p
/`
�t�AL�)6������Wi��g1�&/3/�`)�ԋ!��q��	��,NLk�4JI�D-��"9��|�Fq��h[c�.;�'p����EU�o�׼U=H٥�F²2���9Y�f����6��-��8���b
     