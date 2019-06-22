import PropType from 'prop-types';
import {
  CustomHorizontalSelect,
  SelectItem,
  Meta,
  Name,
  Description,
  SelectedItem
} from './styles';

type Props = {
  options: Array<Object>,
  multi: Boolean,
  selected: Object,
  handleSelect: Function
};

const HorizontalSelect = ({
  options,
  multi = false,
  selected,
  handleSelect
}: Props) => (
  <CustomHorizontalSelect>
    {options &&
      options.map(({ title, description }) =>
        (!multi && selected !== title) ||
        (multi && !selected.includes(title)) ? (
          <SelectItem
            key={title}
            onClick={() =>
              multi ? handleSelect([title, ...selected]) : handleSelect(title)
            }
          >
            <Meta>
              <Name>{title}</Name>
              <Description>{description}</Description>
            </Meta>
          </SelectItem>
        ) : (
          <SelectedItem
            key={title}
            onClick={() => {
              if (multi) {
                const idx = selected.indexOf(title);
                const newArr = [...selected];
                newArr.splice(idx, 1);
                handleSelect(newArr);
              } else {
                handleSelect(title);
              }
            }}
          >
            <Meta>
              <Name>{title}</Name>
              <Description>{description}</Description>
            </Meta>
          </SelectedItem>
        )
      )}
  </CustomHorizontalSelect>
);

HorizontalSelect.propTypes = {
  options: PropType.array.isRequired,
  multi: PropType.bool.isRequired,
  selected: PropType.oneOfType([PropType.string, PropType.array]).isRequired,
  handleSelect: PropType.func.isRequired
};

export default HorizontalSelect;
