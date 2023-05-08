import moment from 'moment';
import React from 'react';
import Box from '@mui/material/Box';
import { truncate } from 'lodash';
import { Link as LinkMaterial } from '../../../../components/Wrappers';

function imageFormatter(cell, key) {
  const images = cell?.image || cell?.avatar || cell[key] || undefined;
  const imageUrl = images && images.length ? images[0].publicUrl : undefined;

  if (!imageUrl) return null;

  return (
    <Box
      component='img'
      sx={{
        height: 45,
        width: 45,
        borderRadius: '50%',
      }}
      alt='avatar'
      src={imageUrl}
    />
  );
}

function booleanFormatter(cell) {
  return cell ? 'Yes' : 'No';
}

function dateTimeFormatter(cell) {
  return cell ? moment(cell).format('YYYY-MM-DD HH:mm') : null;
}

function filesFormatter(cell, key) {
  return (
    <div>
      {cell && cell[key][0] && (
        <div key={cell[key][0].id}>
          <a
            href={cell[key][0].publicUrl}
            target='_blank'
            rel='noopener noreferrer'
            download
          >
            {truncate(cell[key][0].name)}
          </a>
        </div>
      )}
    </div>
  );
}

function listFormatter(cell, history, entity) {
  if (!cell) return null;

  const getContent = (id, title) => (
    <div key={id}>
      <LinkMaterial
        href='#'
        color={'primary'}
        onClick={(e) => {
          e.preventDefault();
          history.push(`/admin/${entity}/${id}/edit`);
        }}
      >
        {title}
      </LinkMaterial>
    </div>
  );

  return (
    <div>
      {cell &&
        cell.length &&
        cell.map((value) => getContent(value.id, value.firstName))}
      {cell && getContent(cell.id, cell.firstName)}
    </div>
  );
}

export {
  booleanFormatter,
  imageFormatter,
  dateTimeFormatter,
  listFormatter,
  filesFormatter,
};
