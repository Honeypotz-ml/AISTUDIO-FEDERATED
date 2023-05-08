const algorithmsFields = {
  id: { type: 'id', label: 'ID' },

  algorithm_name: { type: 'string', label: 'AlgorithmName' },

  description: { type: 'string', label: 'Description' },

  teams: { type: 'relation_many', label: 'Teams' },

  users: { type: 'relation_many', label: 'Users' },
};

export default algorithmsFields;
