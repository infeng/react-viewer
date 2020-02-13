import React, { useState, useEffect } from 'react';

const parseImagens = (images) => {
  return images.map((image, index) => ({
    ...image,
    id: index,
    checked: false
  }));
};

const ViewerModal = ({ images, onClose, onSubmit }) => {
  const [itens, setItens] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const widthItemImageUploaded = 200;
  const halfFilesUploadedSize = Math.round(itens.length / 2);

  const onChangeCheckbox = (id, checked) => {
    const newItens = itens.map(item => ({
      ...item,
      checked: item.id === id ? !checked : item.checked
    }));
    setItens(newItens);
  }
  const onChangeSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newItens = itens.map(item => ({
      ...item,
      checked: newSelectAll
    }));
    setItens(newItens);
  };
  const onCloseHandle = () => {
    setSelectAll(false);
    const newItens = itens.map(item => ({
      ...item,
      checked: false
    }));
    setItens(newItens);
    onClose()
  }
  useEffect(() => {
    setItens(parseImagens(images));
  }, []);

  const onClickGenerate = () => {
    const itensSelected = itens.filter(({ checked }) => !!checked);
    onSubmit(itensSelected);
    onCloseHandle();
  }

  return (
    <React.Fragment>
      <div className="modal-export__mask" onClick={onCloseHandle} />
      <div className="modal-export">
        <div className="modal-export__header">
          Total de Documentos: {itens.length}
        </div>
        <div className="modal-export__body">
          <div className="modal-export__container" 
            style={{ minWidth: `${widthItemImageUploaded * halfFilesUploadedSize}px` }}>
            {itens.map(({ src, checked, id, name }, index) => {
              return (
                <React.Fragment key={`${index}`}>
                  <label className="modal-export__label">
                    <div className="modal-export__name">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onChangeCheckbox(id, checked)}
                      />
                      <label
                        className="modal-export__text"
                        title={src}
                        onClick={() => onChangeCheckbox(id, checked)}
                      >{name}
                      </label>
                    </div>
                    <img className="modal-export__img-item" src={src} />
                  </label>
                  {index + 1 === halfFilesUploadedSize && (<div className="modal-export__break" />)}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        <div className="modal-export__footer">
          <input type="checkbox" checked={selectAll} onChange={onChangeSelectAll} />

          <label className="modal-export__buttonLabel" onClick={onChangeSelectAll}>
            Selecionar Todos
          </label>

          <button className="modal-export__buttonSair" type="button" onClick={onCloseHandle}>Sair</button>
          <button className="modal-export__buttonPDF" type="button" disabled>Gerar PDF</button>
        </div>

      </div>
    </React.Fragment>
  )
}

export {
  ViewerModal
}
