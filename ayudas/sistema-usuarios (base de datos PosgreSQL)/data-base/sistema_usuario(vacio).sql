PGDMP     7        	            w           sistema_usuarios    11.5    11.5     �
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �
           1262    16623    sistema_usuarios    DATABASE     �   CREATE DATABASE sistema_usuarios WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
     DROP DATABASE sistema_usuarios;
             postgres    false            �            1259    16676    usuarios    TABLE     (  CREATE TABLE public.usuarios (
    usu_password character varying(200) NOT NULL,
    usu_estado integer NOT NULL,
    usu_email character varying(100) NOT NULL,
    usu_nombre character varying(100) NOT NULL,
    usu_id integer DEFAULT nextval('public.usuarios_usu_id_seq'::regclass) NOT NULL
);
    DROP TABLE public.usuarios;
       public         postgres    false            �
          0    16676    usuarios 
   TABLE DATA               [   COPY public.usuarios (usu_password, usu_estado, usu_email, usu_nombre, usu_id) FROM stdin;
    public       postgres    false    197   �       �
      x������ � �     