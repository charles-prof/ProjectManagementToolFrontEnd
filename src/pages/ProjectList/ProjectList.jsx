import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MixerHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import ProjectCard from '@/pages/Project/ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects, searchProjects } from '@/Redux/Project/Action'
export const tags = [
    "all",
    "react",
    "nextjs",
    "spring boot",
    "mysql",
    "mongodb",
    "angular",
    "python",
    "django",
    "flask"
]

const roles = [
    "all",
    "frontend",
    "backend",
    "fullstack",
    "devops",
    "data science"
]

const ProjectList = () => {
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState("")
    const { project } = useSelector(store => store)

    const handleFilterCategory = (value) => {
        if(value=="all") {
            dispatch(fetchProjects({}))
        }
        else {
            dispatch(fetchProjects({ category: value }))
        }
    }

    const handleFilterTags = (value) => {
        dispatch(fetchProjects({ tag: value }))
    }

    useEffect(() => {
        dispatch(fetchProjects({}))
    },[])

    const handleSearchChange = (e) => {
        setKeyword(e.target.value)
        dispatch(searchProjects(e.target.value))
    }

    return (
        <>
            <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
                <section className='filterSection'>
                    <Card className="f-5 sticky top-10">
                        <div className='flex justify-between lg:w-[20rem]'>
                            <p className='text-xl -tracking-wider pl-5'> filters </p>
                            <Button variant='ghost' size='icon'>
                                <MixerHorizontalIcon />
                            </Button>
                        </div>
                        <CardContent className='mt-5'>
                            <ScrollArea className='space-y-7 h-[70vh]'>
                                <div className='pt-9'>
                                    <h1 className='pb-3 text-gray-400 border-b'>
                                        Category
                                    </h1>
                                    <div className='pt-5'>
                                        <RadioGroup
                                            defaultValue='all'
                                            onValueChange={(value) => handleFilterCategory(value)}
                                            className='space-y-3 pt-5'
                                        >
                                            {
                                                roles.map((tag, index) => (
                                                    <div className='flex items-center gap-2' key={index}>
                                                        <RadioGroupItem value={tag} id={`r${index + 2}`} />
                                                        <Label htmlFor={`r${index + 2}`}>{tag}</Label>
                                                    </div>
                                                ))
                                            }
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className='pt-9'>
                                    <h1 className='pb-3 text-gray-400 border-b'>
                                        Tag
                                    </h1>
                                    <div className='pt-5'>
                                        <RadioGroup
                                            defaultValue='all'
                                            onValueChange={(value) => handleFilterTags(value)}
                                            className='space-y-3 pt-5'
                                        >
                                            {
                                                tags.map((tag, index) => (
                                                    <div className='flex items-center gap-2' key={index}>
                                                        <RadioGroupItem value={tag} id={`r${index + 2}`} />
                                                        <Label htmlFor={`r${index + 2}`}>{tag}</Label>
                                                    </div>
                                                ))
                                            }
                                        </RadioGroup>
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </section>
                <section className='projectListSection w-full lg:w-[48rem]'>
                    {/* project list here */}
                    <div className='flex gap-2 items-center pb-5 justify-between'>
                        <div className='relative p-0 w-full'>
                            <Input
                                onChange={handleSearchChange}
                                placeholder='search project'
                                className='40% px-9' />
                            <MagnifyingGlassIcon className='absolute top-3 left-4' />

                        </div>
                    </div>
                    <div>
                        <div className='space-y-5 min-h-[74vh]'>
                            {
                                keyword 
                                ? project.searchProjects?.map((item) => <ProjectCard key={item.id} item={item}/>)
                                : project.projects?.map((item) => <ProjectCard key={item.id} item={item}/>)
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ProjectList
