import {useState} from "react";
import {Artigo} from "../TypesConteudos/Conteudos/Artigo.ts";
import {Curso} from "../TypesConteudos/Conteudos/Curso.ts";
import {Noticia} from "../TypesConteudos/Conteudos/Noticia.ts";
import {Video} from "../TypesConteudos/Conteudos/Video.ts";

export const useItemsAndModal = () => {

    const [items, setItems] = useState({
        artigos: [],
        cursos: [],
        noticias: [],
        videos: [],
        eventos: []
    });
    const [modal, setModal] = useState<{
        type: 'artigo' | 'curso' | 'noticia' | 'video'| 'evento',
        show: boolean,
        editIndex: number | null
    }>({ type: 'artigo', show: false, editIndex: null });

    const openModal = (type: 'artigo' | 'curso' | 'noticia' | 'video' | 'evento' , editIndex: number | null = null) => {
        setModal({type, show: true, editIndex});
    };

    const closeModal = () => {
        setModal(prev => ({...prev, show: false}));
    };

    const saveItem = <T extends Artigo | Curso | Noticia | Video>(
        type: keyof typeof items,
        item: T,
        editIndex: number | null
    ) => {
        setItems(prev => {
            const newItems = [...prev[type]] as T[];
            if (editIndex !== null) {
                newItems[editIndex] = item;
            } else {
                newItems.push(item);
            }
            return { ...prev, [type]: newItems };
        });
        closeModal();
    };

    const deleteItem = (type: keyof typeof items, index: number) => {
        setItems(prev => {
            const newItems = [...prev[type]];
            newItems.splice(index, 1);
            return {...prev, [type]: newItems};
        });
    };

    return {items, modal, openModal, closeModal, saveItem, deleteItem};
};