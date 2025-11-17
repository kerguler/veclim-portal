import imageSandFlyMicro from 'assets/images/methods-sandfly-micro2.webp';
import imageSandFlyCyprus from 'assets/images/methods-sandfly-Cyprus.webp';
import imageSandFlySEM from 'assets/images/methods-sandfly-SEM2.webp';
import imageSandFlyLeish from 'assets/images/methods-sandfly-leish.webp';
import imageSandFlyPhoto from 'assets/images/methods-sandfly-photo2.webp';
import imageSandFlyTime from 'assets/images/methods-sandfly-ts.webp';

export const methodsPageSand = {
  id: 4,
  page: 'MethodsPageSand',
  topper: {
    topperTitle: null,
    topperContent: (
      <>
        <p>
          "Most of the world’s poverty-related neglected diseases, including the
          NTDs <br />
          and the big three diseases - HIV/AIDS, tuberculosis, and malaria - are
          in fact <br />
          most widely prevalent in G20 economies"
        </p>
      </>
    ),
    topperWriter: <p> Peter J. Hotez </p>,
    topperReference: <></>,
  },
  rows: [
    {
      rowno: 0,
      title: '',
      content: '',
      image: imageSandFlyMicro,
      rotate: false,
      wide: true,
      reverse: false,
      newsStyle: false,
    },
    {
      rowno: 1,
      title: <h4>A tropical disease - long neglected but deadly</h4>,
      content: (
        <>
          {' '}
          <p className="quote">
            <strong>
              "That's odd." he thought looking through the microscope. He turned
              the large brass knob a couple of degrees forward, then backward
              again, and shifted the slide only to pop another bunch of these in
              focus. He reached for the dark vial and carefully unscrewed the
              dropper. This was his legacy.
            </strong>
          </p>
          <p>
            He grew up in a family of scholars, and always aspired to unravel
            the never-ending mysteries of nature. This compound staining
            solution was his invention to mark native and foreign DNA in blood.
            Thus, he was helping to identify disease causing agents with ease.
          </p>
          <p>
            He carefully stained another preparation, but the result was the
            same, an assortment of purple speckles of a distinct oval shape.
            This was nothing like he has ever seen before, certainly not
            Plasmodium, the malaria parasite, but not quite the usual
            Trypanosoma either - that's the cause of another disease, the
            sleeping sickness.
          </p>
          <p>
            <strong>
              Since the dawn of our species, we have been battling with the
              forces of nature - fires, floods, and ferocious beasts. Most of
              what kills us, however, has been the ones too small to see.
              William Boog Leishman, a bright young pathologist at the beginning
              of the twentieth century, was studying the cause of a decades-long
              epidemic in India, named black fever or kala-azar. His discovery
              was later named by Sir Ronald Ross, the father of tropical
              medicine, as Leishmania donovani, a one-celled blood parasite
              causing the dreadful disease, visceral leishmaniasis.
            </strong>
          </p>
        </>
      ),
      image: imageSandFlySEM,
      rotate: false,
      wide: false,
      reverse: false,
      newsStyle: true,
    },
    {
      rowno: 2,
      title: <h4>Neglected Tropical Diseases</h4>,
      content: (
        <>
          {' '}
          <p>
            Leishmaniasis is not one but a spectrum of diseases caused by around
            20 parasite species of the <i>Leishmania</i> genus. It belongs to a
            group of neglected tropical diseases (NTDs) struggling to hold on to
            the global health agenda. It is fatal if untreated, or it leaves
            patients with serious disfigurement and disability, yet it remains
            neglected.
          </p>
          <p>
            <strong>
              NTDs mainly affect the poorest communities in Africa, Asia, and
              Latin America, but are widely prevalent in the impoverished areas
              of wealthy countries, afflicted with limited access to sanitary
              conditions, clean water, and health care. The pharmaceutical
              industry sees research and development in this area highly risky
              and hardly profitable. Most progress is thus made with the help of
              governments and foundations, and is rather slow and with great
              difficulty.
            </strong>
          </p>
          <p>
            Many NTDs show no immediate symptoms and spread in a population
            silently. When they do, however, maybe after many years, it becomes
            nearly impossible to identify the source of infection and take
            precautions. Social stigma does not make it any better as the
            affected tend to be ostracised, thus reluctant to seek medical
            attention.
          </p>
          <p>
            <strong>
              Fortunately, a substantial number of NTDs is vector-borne, and
              controlling the vector has proven immensely effective since the
              time of Sir Ronald Ross.
            </strong>
          </p>
        </>
      ),
      image: imageSandFlyLeish,
      rotate: false,
      wide: true,
      reverse: false,
      newsStyle: false,
    },
    {
      rowno: 3,
      title: <h4>Sand Flies</h4>,
      content: (
        <>
          {' '}
          <p>
            Phlebotomine sand flies are the vectors of leishmaniasis and several
            phleboviruses, such as Naples, Sicilian, and Toscana viruses. They
            are much hairier and smaller than mosquitoes (about a quarter of
            their size) and they inflict a much more painful bite.
          </p>
          <p>
            <strong>
              The reason for this itchy blood meal is their lack of elaborate
              apparatus to access a vein for efficient blood collection.
              Instead, sand flies feed on the blood pool formed on the skin as
              they pierce it with their mouthparts. As a result of this messy
              operation, a considerable amount of saliva is transferred to the
              host along with potential allergens and pathogens.
            </strong>
          </p>
          <p>
            In contrast to mosquitoes, sand flies do not have an aquatic life
            stage, but they rely on humidity and decaying organic matter to
            reach adulthood. Cracks and holes in the ground, animal burrows, and
            leaf litter provide excellent breeding grounds. Temperature, as in
            the case of mosquitoes, plays a pivotal role in setting the pace of
            their entire life cycle.
          </p>
          <p>
            <strong>
              They bite humans and also other mammals, such as domestic dogs and
              rodents, which usually become part of the pathogen reservoir in an
              area.
            </strong>
          </p>
        </>
      ),
      image: imageSandFlyPhoto,
      rotate: false,
      wide: false,
      reverse: false,
      newsStyle: true,
    },
    {
      rowno: 4,
      title: <h4>A Sand Fly Model for Cyprus</h4>,
      content: (
        <>
          {' '}
          <p>
            Cyprus is an island between Southeast Europe, North Africa, and West
            Asia. Although leishmaniasis was nearly eradicated from the island
            by 1996, an active circulation of the parasites has been reported
            amid a set of favourable conditions, such as rapid urbanisation,
            extensive agriculture, changing environmental conditions, and
            population movement from disease-endemic countries.
          </p>
          <p>
            <strong>
              The island hosts a rich sand fly fauna, where{' '}
              <i>Phlebotomus papatasi</i> is the most widely distributed. We
              have recently developed a climate-sensitive population dynamics{' '}
              <a
                href="https://doi.org/10.1016/j.crpvbd.2023.100152"
                rel="noreferrer"
                target="_blank"
              >
                model
              </a>{' '}
              for this species incorporating a combination of meteorological
              modelling and land cover characterisation.
            </strong>
          </p>
        </>
      ),
      image: imageSandFlyCyprus,
      rotate: false,
      wide: false,
      reverse: true,
      newsStyle: true,
    },
    {
      rowno: 5,
      title: '',
      content: (
        <>
          <p>
            We simulated the relative spatial (2 km horizontal grid spacing) and
            temporal (daily time steps) dynamics of the species across the
            island for both primary and secondary habitats. Our simulations
            cover only 2015, with the initial quarter lost as the population
            transitions into the expected dynamics. Despite these limitations,
            our assessment indicates potential breeding habitats and times of
            peak activity, informing public health policies for developing
            optimum intervention strategies.
          </p>
        </>
      ),
      caption: (
        <>
          {' '}
          <p>
            The average relative abundance of <i>Ph. papatasi</i> in Cyprus in
            2015. We performed two sets of simulations to represent populations
            growing in their primary and secondary habitats.
          </p>
        </>
      ),
      image: imageSandFlyTime,
      rotate: false,
      wide: true,
      reverse: true,
      newsStyle: false,
    },
  ],
};
