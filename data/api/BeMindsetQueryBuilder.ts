import {SectionConstants, SectionKeys} from './entities/Section';
import {DocumentConstants, DocumentKeys} from './entities/Document';
import {ObjectConstants, ObjectKeys} from './entities/CommonObjects';
import {ExternalLinkKeys, ExternalLinkConstants} from './entities/ExternalLink';

const debug: boolean = false;

const tfv: TypeFilterVariables = {type: 'type'};
const [sk, sc, dk, dc, elk, elc] = [
  new SectionKeys(),
  new SectionConstants(),
  new DocumentKeys(),
  new DocumentConstants(),
  new ExternalLinkKeys(),
  new ExternalLinkConstants(),
];

export function getSectionsQuery() {
  const query = `
      *[${_typeFilter(sk, tfv)}]
       |${_orderBy(sk.section_order)} 
       {${_keys(...sk.all)}}
    `;
  const params = {
    ..._typeFilterParams(tfv, sc),
  };
  log({query, params});
  return {query, params};
}

export function getDocumentQuery(key: string) {
  const dv = {key: 'key'};
  const query = `
      *[${_typeFilter(dk, tfv)}
     && ${_equals(dk.document_key, dv.key)}]
       {${_keys(...dk.all)}}
    `;
  const params = {
    ..._typeFilterParams(tfv, dc),
    key,
  };
  log({query, params});
  return {query, params};
}

export function getExternalLinkQuery() {
  const query = `
    *[${_typeFilter(elk, tfv)}]
    |${_orderBy(elk.order)}
    {${_keys(...elk.all)}}`;

  const params = {
    ..._typeFilterParams(tfv, elc),
  };
  log({query, params});
  return {query, params};
}

type TypeFilterVariables = {type: string};

function _typeFilter(keys: ObjectKeys, variables: TypeFilterVariables) {
  let query = _equals(keys._type, variables.type);
  const draftsFilter = `(${keys._id} in path("drafts.**"))`;
  query += ` && !${draftsFilter}`;

  return query;
}

function _typeFilterParams(variables: TypeFilterVariables, constants: ObjectConstants) {
  return {[variables.type]: constants.type};
}

function _orderBy(...keys: string[]) {
  return `order(${_keys(...keys)})`;
}

function _keys(...keys: string[]) {
  return keys.join(',');
}

function _equals(key: string, variable: string) {
  return `${key} == $${variable}`;
}

function log(object: {query?: string; params?: any}) {
  if (!debug) return;
  console.log(object);
}
