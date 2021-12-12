const data = [
    {
        "id": 1,
        "title": "Introduction",
        "text": ["In this tutorial we will learn an application of color space and that is, how to simulate color blindness. Color blindness is a hereditary condition, more common in males than females. Around <> males are affected by color blindness whereas <> females are affected by color blindness. The reason more males are impacted is because color blindness occurs when there is a defect in the X chromosome. Since males have one X chromosome compared to two in females, males are more susceptible to this condition.",
            "Simulating color blindness is an interesting application of using the color space in an innovative way as we will see later in the tutorial. The main reason why this can be done is due to the linearity of color space."]
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
        "text": ["The types of color blindness can be specified by first knowing how many different types of cones are not working for an individual. A person who has all three types of cones working normally is referred to as a trichromat. A person who has two types of cones working is referred to as a dichromat. Finally, the most rare of them all is a monochromat who has one type of cone working. A dichromat is further classified into Protonopia, who has a defective L cone, Deuteranopia,  who has a defective M cone, Tritanopia, who has a defective S cone.",
            "Most common are the dichromats, who have a weak/missing cone. Out of that red-green is the most common but as we will later see, by choosing the correct invariant color we can simulate any type of dichromatic vision"]
    },
    {
        "id": 4,
        "title": "A general strategy",
        "text": []
    },
    {
        "id": 5,
        "title": "Finding the plane",
        "text": ["To find the appropriate plane, we require three points. Studies have shown that a color blind person sees white and black colors as it is. So we are going to fix (0,0,0) and (1,1,1) as two points. So what about the third point? The third point would also be a color that a color blind person sees it as a normal person would.",
            "Here, our knowledge of the different type of color blindness comes in. If a person is red-green deficiet, we know that they won't have any issues seeing blue color. So to simulate protonopia, we can fix the third point as a blue color.",
            "To calculate the normal to the plane, we need an invariant color that will form the third point on the plane. The RGB values will be transformed to LMS values."]
    },
    {
        "id":6,
        "title": "About color spaces",
        "text": ["Color spaces are mathematical objects. They allow us to treat colors as numbers. So we can do things like add two colors together. Color spaces can be transformed from one to the other if both color spaces are linear. The color space, which is used to show items on our displays are not linear. So we need to convert the color space into linear RGB. Then we can convert it into LMS.",
            "To convert from the RGB value we see on screen to linear RGB we use the following formula"]
    },
    {
        "id":7,
        "title": "Converting the pixel to LMS",
        "text": ["We can apply the conversion on the pixel that we obtained to get"]
    },
    {
        "id": 8,
        "title": "Moving into the human visual system",
        "text": ["To simulate color blindness we will need to move to the LMS space, the transformation from linear RGB to LMS is given by"]
    },
    {
        "id": 9,
        "title": "Projecting onto the plane",
        "text": ["If we wanted to take the project one vector on another it would be a simple matter of taking their dot products. In this case we need to project a vector onto a plane. If v is the original vector and n is the normal of the plane we can find u, the projected vector as v-n. The above pixel value, when projected onto the plane given by the normal derived above is"]
    },
    {
        "id": 10,
        "title": "A different view",
        "text": ["An image is just a collection of (non-linear) RGB values. To simulate how a color blind person would see the image, we have to do is convert the RGB into LMS space, perform the projection and convert the projected points back into (non-linear) RGB. Below is a sample image, you have the option to upload your own image and see how it looks. Click on the simulate button to see how the image would look like"]
    },
    {
        "id": 11,
        "title": "Exercise",
        "text": ["Below is an image used to check if a person is color blind or not. In particular this image is used to check if a person is blue-green color blind. The default value for a normal is set to one that can simulate Protonopia. Adjust the values below in such a way that in the simulated image, the number disappears. Hint: a person deficit in the blue-green spectrum would be able to see red correctly."]
    }
];

export default data;