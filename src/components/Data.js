export default {
  Key: 'ObjectKey', Value: 'ObjectValue',
  children: [

    { Key: 'ObjectKey', Value: 'ObjectValue' },
    { Key: 'ObjectKey', Value: 'ObjectValue'},
    {
      Key: 'ObjectKey', Value: 'ObjectValue',
      children: [
        {
          Key: 'ObjectKey', Value: 'ObjectValue',
          children: [
            { Key: 'Multi', Value: 'Scalar' },
            { Key: 'ObjectKey', Value: 'ObjectValue' }
          ]
        },
        { Key: 'ObjectKey', Value: 'ObjectValue' },
        { Key: 'ObjectKey', Value: 'ObjectValue' },
        {
          Key: 'ObjectKey', Value: 'ObjectValue',
          children: [
            { Key: 'ObjectKey', Value: 'ObjectValue' },
            { Key: 'ObjectKey', Value: 'ObjectValue' }
          ]
        }
      ]
    },
    { Key: 'ObjectKey', Value: 'ObjectValue',
      children: [{Key: 'ObjectKey', Value: 'ObjectValue'}]

  },
  ]
}