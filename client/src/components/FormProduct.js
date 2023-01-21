import React from 'react';

import { Formik } from 'formik';
import { Button, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';

// import { ErrorMessage } from '../components';

// 12  3(product)
// name description price category image

const FormProduct = ({ btnTxt = 'Save Product', onSubmit, product = {} }) => {
  const { name = '', description = '', price = '', category = '' } = product;

  return (
    <Formik
      initialValues={{ name, description, price, category, image: undefined }}
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().min(3),
        price: Yup.number().required(),
        category: Yup.string().required(),
      })}
      render={({
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,//////////////////
        values,///////////////////
        handleSubmit,
        isValid,
        isSubmitting,
      }) => (
        <div>
          {/* error component */}
          {/* <ErrorMessage /> */}

          <FormGroup>
            <Label>name</Label>
            <Input
              invalid={errors.name && touched.name}
              name="name"
              type="string"
              value={values.name}
              placeholder="Enter product name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <FormFeedback>{errors.name}</FormFeedback>
            )}
          </FormGroup>


          <FormGroup>
            <Label>Description</Label>
            <Input
              invalid={errors.description && touched.description}
              name="description"
              type="string"
              value={values.description}
              placeholder="Enter product description"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <FormFeedback>{errors.description}</FormFeedback>
            )}
          </FormGroup>


          <FormGroup>
            <Label>price</Label>
            <Input
              invalid={errors.price && touched.price}
              name="price"
              type="number"
              value={values.price}
              placeholder="Enter product price"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price && (
              <FormFeedback>{errors.price}</FormFeedback>
            )}
          </FormGroup>


          <FormGroup>
            <Label>category</Label>
            <select
              invalid={errors.category && touched.category}
              name="category"
              type="password"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"

            >
              <option value="selected" >Choose a category</option>
              <option value="clothes">Clothes</option>
              <option value="phones">Phones</option>
              <option value="computers">Computers</option>
            </select>
            {errors.category && touched.category && (
              <FormFeedback>{errors.category}</FormFeedback>
            )}
          </FormGroup>



          <FormGroup>
            <Label>image (optional)</Label>
            <Input
              name="image"
              type="file"
              onChange={(e) => setFieldValue('image', e.target.files[0])}
            />
          </FormGroup>

          <Button
            color="warning"
            style={{ marginTop:15 }}
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            {btnTxt}
          </Button>
        </div>
      )}
    />
  );
};

export { FormProduct };
