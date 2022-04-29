import React, { useEffect } from 'react';
import { BasicDetailsStyle } from './components/testTemplateElements';
import Button from '@material-ui/core/Button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

const TagWeightage = ({ nextStep, prevStep, tagList, tags, tagsWeightage, handleTagsWeightageChanges}) => {

  useEffect(() => {
    console.log('tags==>', tags); 
    if(tagsWeightage && tagsWeightage.length === 0) {
      const filteredTagList = tagList.filter((t) => {
        return tags.some((f)=> {
          return f === t.value;
        });
      });
      const newFilteredTagList = filteredTagList.map((t, index) => {
        return {
          label: t.label,
          level: index + 1
        };
      })
      handleTagsWeightageChanges(newFilteredTagList);
    }
  }, []);

  const onRowReorder = (e) => {
    const reorderedTagList = e.value;
    const newReorderedTagList = reorderedTagList.map((t, index) => {
      return {
        label: t.label,
        level: index + 1
      };
    })
    handleTagsWeightageChanges(newReorderedTagList);
  }

  const isPositiveInteger = (val) => {
    let str = String(val);
    str = str.trim();
    if (!str) {
        return false;
    }
    str = str.replace(/^0+/, '') || '0';
    let n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }

  const reorderLevels = (i, diff) => {
    const newReorderedTagList = tagsWeightage.map((t, index) => {
      if(index <= i) {
        return t;
      } else {
        return {
          label: t.label,
          level: t.level + diff
        };
      }
    })
    handleTagsWeightageChanges(newReorderedTagList);
  }

  const onCellEditComplete = (options, e) => {
    let { rowData, field, rowIndex } = options;
    let { value } = e.target;
    console.log('options==>', options);
    console.log('e==>', e);
    if(field === 'level') {
      if (isPositiveInteger(value)) {
        const oldValue = rowData[field];
        rowData[field] = value;
        const diff = value - oldValue;
        reorderLevels(rowIndex, diff);
      }
      else {
        e.preventDefault();
      }
    }
    else {
      rowData[field] = value;
    }
  }

  const textEditor = (options) => {
    return <InputText type='text' value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }

  const levelEditor = (options) => {
    const tag = options.value[options.rowIndex];
    console.log('tag.level==>', tag.level);
    return <InputNumber inputId='integeronly' value={tag.level} onValueChange={(e) => options.onCellEditComplete(options, e)} />
  }

  const cellEditor = (options) => {
    if (options.field === 'level')
        return levelEditor(options);
    else
        return textEditor(options);
  }

  return(
        <BasicDetailsStyle>
            <center>
                <h3>Reorder the Personality Traits</h3>
                <br />
                <div className='card'>
                  <DataTable editMode='cell' className='editable-cells-table' value={tagsWeightage} onRowReorder={onRowReorder} responsiveLayout='scroll'>
                    <Column rowReorder style={{width: '8px'}} />
                    <Column key='label' columnKey='label' field='label' header='Personality Traits Selected' style={{ width: '60%' }}></Column>
                    <Column key='level' columnKey='level' field='level' header='Importance' editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} style={{ width: '30%' }}></Column>
                  </DataTable>
                </div>
                <br />
                <Button color='secondary' variant='contained' onClick={prevStep}>
                  Back
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color='primary' variant='contained' onClick={nextStep}>
                  Continue
                </Button>
            </center>
        </BasicDetailsStyle>
    )
}
export default TagWeightage;















// import React, { useState, useEffect } from 'react';
// import { BasicDetailsStyle } from './components/testCreationElements';
// import Button from '@material-ui/core/Button';
// import { PickList } from 'primereact/picklist';

// import './TagWeightage.css';

// const TagWeightage = ({ nextStep, prevStep, tagList, tags, handleTagChanges}) => {
//   const [source, setSource] = useState([]);
//   const [target, setTarget] = useState([]);

//   const onChange = (event) => {
//     setSource(event.source);
//     setTarget(event.target);
//     console.log('event.target==>', event.target);
//         handleTagChanges(event);
// }

// useEffect(() => {
//   if(tagList){
//     const newTagList = tagList.map((t) => {
//       return t.value;
//     });
//     // console.log('newTagList==>', newTagList);    
//     const filteredTagList = newTagList.filter((t) => {
//       return tags.indexOf(t) === -1;
//     })
//     // console.log('filteredTagList==>', filteredTagList);     
//     setSource(filteredTagList);
//     if(tags && tags.length>0){
//       setTarget(tags);
//     }
//   }
//   // console.log('useEffect Called in tagWeightage');
// }, []);

//   const itemTemplate = (item) => {
//     return (
//         <div className='product-item'>
//             <div className='product-list-detail'>
//               <h5 className='p-mb-2'>{item}</h5>
//             </div>
//             <div className='product-list-action'>
//               <h6 className='p-mb-2'>${item}</h6>
//             </div>            
//         </div>
//     );
//   }

//     return(
//         <BasicDetailsStyle>
//             <center>
//                 <h3>Select Tags and Reorder Them</h3>
//                 <br />
//                 <div className='picklist-demo'>
//                   <div className='card'>
//                     <PickList source={source} target={target} targetItemTemplate={itemTemplate}
//                       sourceHeader='Tag List' targetHeader='Reorder Selected Tags'
//                       sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }}
//                       onChange={onChange}></PickList>
//                   </div>
//                 </div>

//                 <Button color='secondary' variant='contained' onClick={prevStep}>
//                   Back
//                 </Button>

//                 <Button color='primary' variant='contained' onClick={nextStep}>
//                   Continue
//                 </Button>
//             </center>  
//         </BasicDetailsStyle>
//     )
// }
// export default TagWeightage;