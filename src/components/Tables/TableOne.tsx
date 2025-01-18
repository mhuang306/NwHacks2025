import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    revenues: '5,768',
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    revenues: '4,635',
  },
  {
    logo: BrandThree,
    name: 'Github',
    revenues: '4,290',
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    revenues: '3,580',
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    revenues: '6,768',
  },
];

const Leaderboard = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Leaderboard
      </h4>

      <div className="flex flex-col">
        {brandData.map((brand, key) => (
          <div
            className={`flex items-center gap-4 p-2.5 xl:p-5 ${
              key === brandData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex-shrink-0">
              <img src={brand.logo} alt={brand.name} className="w-8 h-8" />
            </div>
            <p className="text-black dark:text-white">{brand.name}</p>
            <p className="text-meta-3">${brand.revenues}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
