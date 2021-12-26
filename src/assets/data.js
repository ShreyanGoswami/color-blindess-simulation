const data = [
    {
        "id": 1,
        "title": "Introduction",
        "text": ["In this tutorial we will learn an application of color space and that is, how to simulate color blindness. Color blindness is a hereditary condition, more common in males than females. Around 1 in 12 males are affected by color blindness while 1 in 200 females are affected by color blindness. The reason more males are impacted is because color blindness occurs when there is a defect in the X chromosome. Since males have one X chromosome compared to two in females, males are more susceptible to this condition.",
            "Simulating color blindness is an interesting application of using the color space in an innovative way as we will see in the tutorial. The main reason such a simulation is possible is due to the linearity of color space. Hence, colors can be added and transformed just like a vector space."]
    },
    {
        "id": 2,
        "title": "Can we see the world as how a color blind person sees it",
        "text": ["To answer this question we need a brief introduction to the human visual system. Our eyes contain cones and rods for detecting color around them. The rods are used at night or in a dark environment. The cones are the main structure that allows us to perceive color. There are three types of cones called large, medium and small cones. Each cone is good at handling a particular range of wavelengths. You can see the response function for each cone. The y-axis on the graph is the probability that the cone will be activated for that particular wavelength. As you can see the three cone responses overlap i.e more than one cone can get activated at a particular wavelength.",
            "The response of the cones to a light spectrum is called the LMS response. Light normally features a wide range of wavelengths as demonstrated by Issac Newton. Our eye creates a single LMS response for an entire light spectrum effectively integrating the energies of light at each wavelength.",
            "There are many misconceptions about color blindness and one of the main ones is the view that color blind people can’t see any color at all. That is not correct. Depending on the type of color blindness, a color blind person will not see particular colors in the spectrum."]
    },
    {
        "id": 3,
        "title": "Types of color blindness",
        "text": ["The types of color blindness can be specified by first knowing how many different types of cones are not working for an individual. A person who has all three types of cones working normally is referred to as a trichromat. A person who has two types of cones working is referred to as a dichromat. Finally, the most rare of them all is a monochromat who has one type of cone working. A dichromat is further classified into Protanopia, who has a defective L cone, Deuteranopia,  who has a defective M cone, Tritanopia, who has a defective S cone.",
            "Most common are the dichromats, who have a weak/missing cone. Out of that red-green is the most common. As we will see later, by choosing the correct invariant color we can simulate any type of dichromatic vision"]
    },
    {
        "id": 4,
        "title": "A general strategy",
        "text": ["The technique to perform color blindless simulation has been taken from the paper, Computerized simulation of color appearance for dichromats by Brettel et al.",
            "To perform the simulation, the paper described deriving two two-dimensional planes. The idea relies on previous studies done on an unilateral color deficient observer. An unilateral color deficient person is color blind in one eye while being trichromat in the other. With their help the study showed that at wavelengths 475nm and 575nm a trichromat and dichromat perceive the color in the same way. Also neutral white is perceived in the same way by a dichromat and trichromat.<Add references>",
            "To define a plane, we need three points. The first one is the origin(O) which is black. The second point is E(neutral white). The third point is 475nm on one plane and 575nm on the other plane."]
    },
    {
        "id": 5,
        "title": "Step 1: Finding the planes",
        "text": ["As mentioned above we need three points. For neutral white we have picked Equal Energy White, an illuminant that has SPD of one at every wavelength. From previous studies, it is safe though not a strict requirement, we have assumed 475nm and 575nm to be invariant colors."]
    },
    {
        "id": 7,
        "title": "Step 2: Converting pixels from sRGB to LMS",
        "text": ["There is a bit of nuance in this step. We can use the Hunt-Pointer-Estevez transformation matrix to convert from XYZ to LMS color space. Apart from the ability to perceive color the human eye is capable of adapting to the scene. White is always perceived as white regardless of the lighting conditions in the scene. We are going to assume that a color blind person does not lose this ability of adaptation",
            "The matrix below converts values from XYZ to LMS adapted to natural illuminant D65. So moving from RGB to LMS is a two step process, move RGB to XYZ and move from XYZ to LMS using the HPE matrix adapted to a particular illuminant.",
            "Finally, the LMS values that are used for the simulation are converted from XYZ to LMS using the HPE matrix instead of taking the Stockman and Sharpe LMS cone responses directly."]
    },
    {
        "id": 8,
        "title": "Moving into the human visual system",
        "text": ["To simulate color blindness we will need to move to the LMS space, the transformation from linear RGB to LMS is given by"]
    },
    {
        "id": 9,
        "title": "Step 4: Projecting onto the plane",
        "text": ["If we wanted to project one vector on another it would be a simple matter of taking their dot products. In this case we need to project a vector onto a plane. If v is the original vector and p is the projection of v on the normal, the projected vector is v-p. The above pixel value, when projected onto the plane given by the normal in LMS space is"]
    },
    {
        "id": 10,
        "title": "Step 3: Simulation",
        "text": ["An image is a collection of (non-linear) RGB values. To simulate how a color blind person would see the image, we have to take the image through multiple color spaces. First is to move from sRGB to linear RGB which involves removing the gamma from the pixel. Next is to move to XYZ color space. Finally, we move to LMS color space under a particular illuminant.",
        "Next, we find a point on the plane that has the same M and S values as the converted pixel value, however the L value is changed. If Q(L',M,S) describes the point on the plane and N(x,y,z) is the normal for the plane we have"]
    },
    {
        "id": 11,
        "title": "Taking an eye test",
        "text": ["Now that we understand the individual steps, we are now ready to see this technique in action. Protanopia or red-green deficiency is the most common color blindess. People with this condition don't see the color red as how a trichromat would. For them it looks like a yellow color. One of the common problems with such a deficiency is the difficulty to pick ripe fruits in particular apples. Sometimes a Protanope would have trouble distinguishing traffic signals when they are in a different country as the order in which the signals are arranged can be different.",
            "The Ishihara test is a color perception test to detect red-green deficiency. You might have seen the image below on the internet. It was named after its designer, Shinobu Ishihara, a professor at the University of Tokyo, who first published his tests in 1917. The test consists of identifying the number in the image. For someone with protanopia, they would not be able to distinguish the red from the surrounding greens.",
            "In this section, the planes and image are fixed. All you have to do is click the Simulate button. Notice how the colors look yellowish in the image and there is no way to make out the original number."]
    }
];

export default data;